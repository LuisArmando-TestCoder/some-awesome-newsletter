<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  // Shader code input
  export let shader;

  // Built-in uniforms
  let canvas: HTMLCanvasElement;
  let gl: WebGLRenderingContext;
  let program: WebGLProgram;
  let animationFrameId: number;
  let startTime = Date.now() + Math.random() * 1e8;
  let mouseDown = false;

  // Uniforms as component parameters
  export let iResolution = () => ({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  export let iMouse = { x: 0, y: 0, z: 0, w: 0 };
  export let iChannel0: string | null = null;
  export let iChannel1: string | null = null;
  export let iChannel2: string | null = null;
  export let iChannel3: string | null = null;

  // Handle mouse events
  function handleMouseMove(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    iMouse.x = event.clientX - rect.left;
    iMouse.y = rect.height - (event.clientY - rect.top);
    if (mouseDown) {
      iMouse.z = iMouse.x;
      iMouse.w = iMouse.y;
    }
  }

  function handleMouseDown(event: MouseEvent) {
    mouseDown = true;
    handleMouseMove(event);
  }

  function handleMouseUp(event: MouseEvent) {
    mouseDown = false;
  }

  // Handle window resize
  function handleResize() {
    iResolution().x = canvas.parentElement?.clientWidth!;
    iResolution().y = canvas.parentElement?.clientHeight!;
    canvas.width = iResolution().x;
    canvas.height = iResolution().y;
    if (gl) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
  }

  // Load texture for iChannel uniforms
  function loadTexture(gl: WebGLRenderingContext, url: string, unit: number) {
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Placeholder while the image loads
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 255])
    );

    // Set texture parameters for NPOT compatibility
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Unbind the texture
    gl.bindTexture(gl.TEXTURE_2D, null);

    const image = new Image();

    // Set crossOrigin only if the URL is absolute
    if (url.startsWith("http://") || url.startsWith("https://")) {
      image.crossOrigin = "anonymous";
    }

    image.onload = function () {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.generateMipmap(gl.TEXTURE_2D);
    };
    image.src = url;

    return texture;
  }

  onMount(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    gl = canvas.getContext("webgl")!;

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Vertex shader source
    const vertexShaderSource = `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

    // Fragment shader source with user-provided shader code
    const fragmentShaderSource = `
        precision mediump float;
        uniform vec3 iResolution;
        uniform float iTime;
        uniform vec4 iMouse;
        uniform sampler2D iChannel0;
        uniform sampler2D iChannel1;
        uniform sampler2D iChannel2;
        uniform sampler2D iChannel3;
  
        // User-provided shader code
        ${shader}
  
        void main() {
          vec4 color;
          mainImage(color, gl_FragCoord.xy);
          gl_FragColor = color;
        }
      `;

    // Compile shaders
    function compileShader(type: GLenum, source: string) {
      const shader: WebGLShader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const infoLog = gl.getShaderInfoLog(shader);
        console.error("Shader compile failed:\n", infoLog);
        console.error("Shader source:\n", source);
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) {
      console.error(
        "Shader compilation failed. Please check your shader code."
      );
      return;
    }

    // Link program
    program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program failed to link: " + gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // Set up a full-screen quad
    const positionLocation = gl.getAttribLocation(program, "position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");
    const iChannelLocations = [
      gl.getUniformLocation(program, "iChannel0"),
      gl.getUniformLocation(program, "iChannel1"),
      gl.getUniformLocation(program, "iChannel2"),
      gl.getUniformLocation(program, "iChannel3"),
    ];

    // Load textures for iChannels
    [iChannel0, iChannel1, iChannel2, iChannel3].forEach((channel, index) => {
      if (channel) {
        loadTexture(gl, channel, index);
      }
    });

    // Event listener for window resize
    // onMount(() => {
    // });

    // Rendering loop
    function render() {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Set uniform values
      gl.uniform3f(iResolutionLocation, canvas.width, canvas.height, 1.0);
      gl.uniform1f(iTimeLocation, elapsedTime);
      gl.uniform4f(iMouseLocation, iMouse.x, iMouse.y, iMouse.z, iMouse.w);

      // Bind iChannel samplers
      iChannelLocations.forEach((location, index) => {
        gl.uniform1i(location, index);
      });

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    // Event listeners for mouse interactions
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
  });

  // Move onDestroy outside of onMount
  //   onDestroy(() => {
  //     // Cancel the animation frame
  //     // cancelAnimationFrame(animationFrameId);

  //     // Remove event listeners
  //     canvas.removeEventListener("mousemove", handleMouseMove);
  //     canvas.removeEventListener("mousedown", handleMouseDown);
  //     canvas.removeEventListener("mouseup", handleMouseUp);
  //     window.removeEventListener("resize", handleResize);

  //     // Clean up WebGL resources if necessary
  //     if (gl && program) {
  //       gl.deleteProgram(program);
  //     }
  //   });
</script>

<!-- Canvas element where the shader will be rendered -->
<div class="canvas">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .canvas, canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
