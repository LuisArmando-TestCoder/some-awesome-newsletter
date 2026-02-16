<script lang="ts">
    import { fade } from 'svelte/transition';
  
    const values = [
      { 
        title: "High Agency", 
        desc: "We don't wait for permission. We see a bottleneck in a system and we fix it immediately." 
      },
      { 
        title: "Recursive Improvement", 
        desc: "We build tools that build tools. Every task must be easier the second time it is performed." 
      },
      { 
        title: "Human Exploration", 
        desc: "We automate the mundane so our team can spend their cognitive energy on what humans do best: explore." 
      },
      { 
        title: "Radical Execution", 
        desc: "A perfect plan tomorrow is a failure. We value functional, scalable systems delivered today." 
      }
    ];
  
    const openings = [
      { 
          title: "AI Systems Engineer", 
          type: "Full-Time", 
          location: "Remote", 
          team: "Engineering",
          template: "I am applying for the AI Systems Engineer role. \n\nMy experience with LLMs and RAG: \n[Fill here]\n\nA system I built that created leverage: \n[Fill here]\n\nGithub/Portfolio: \n[Link]"
      },
      { 
          title: "Automation Architect", 
          type: "Contract / Project", 
          location: "Remote", 
          team: "Product",
          template: "I am applying for the Automation Architect position. \n\nTop 3 automation tools I master: \n[Fill here]\n\nDescription of a workflow I optimized from hours to minutes: \n[Fill here]"
      },
      { 
          title: "Growth & Leverage Lead", 
          type: "Full-Time", 
          location: "Remote", 
          team: "Marketing",
          template: "I am applying for the Growth & Leverage Lead role. \n\nHow I have used AI to scale content or reach: \n[Fill here]\n\nMy philosophy on systems vs. effort: \n[Fill here]"
      }
    ];
  
    function generateMailto(title: string, body: string) {
      const email = "info@aiban.news";
      const subject = encodeURIComponent(`Application: ${title} at AIBAN`);
      const encodedBody = encodeURIComponent(body);
      return `mailto:${email}?subject=${subject}&body=${encodedBody}`;
    }
  </script>
  
  <svelte:head>
    <title>Careers • A I B A N</title>
  </svelte:head>
  
  <main class="careers">
    <section class="careers__hero">
      <div class="careers__container">
        <h1 class="careers__title">Stop trading time.<br/><span class="highlight">Start building leverage.</span></h1>
        <p class="careers__lead">
          We aren't looking for employees to fill seats. We are looking for architects to build the future of autonomous business scaling.
        </p>
      </div>
    </section>
  
    <section class="careers__philosophy">
      <div class="careers__container grid">
        <div class="careers__visual">
          
        </div>
        <div class="careers__content">
          <h2 class="careers__subtitle">The Mission</h2>
          <p class="careers__text">
            At AIBAN, we believe humans weren't meant to be "job-trapped." We build the systems that set founders free, and we apply that same logic to our own team. 
          </p>
          <p class="careers__text">
            You will find complex puzzles in AI, automation, and scaling that require deep focus and creative execution. We optimize for output and leverage, not hours logged.
          </p>
        </div>
      </div>
    </section>
  
    <section class="careers__values">
      <div class="careers__container">
        <h2 class="careers__subtitle centered">What we value</h2>
        <div class="values-grid">
          {#each values as value}
            <div class="value-card">
              <h3 class="value-card__title">{value.title}</h3>
              <p class="value-card__desc">{value.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <section id="openings" class="careers__openings">
      <div class="careers__container">
        <header class="openings-header">
          <h2 class="careers__subtitle">Current Openings</h2>
          <p>Join the team building the world's most advanced AI-powered business scaling engine.</p>
        </header>
  
        <div class="openings-list">
          {#each openings as job}
            <div class="job-row">
              <div class="job-row__info">
                <h4 class="job-row__title">{job.title}</h4>
                <div class="job-row__meta">
                  <span>{job.team}</span> • <span>{job.location}</span> • <span>{job.type}</span>
                </div>
              </div>
              <a 
                  href={generateMailto(job.title, job.template)} 
                  class="job-row__button"
              >
                  Apply Now
              </a>
            </div>
          {/each}
        </div>
  
        <div class="careers__speculative">
          <p>Don't see a role that fits? We always have room for exceptional builders.</p>
          <a href="mailto:info@aiban.news" class="link">Send a speculative application to info@aiban.news →</a>
        </div>
      </div>
    </section>
  </main>
  
  <style lang="scss">
    .job-row__button {
      display: inline-block;
      text-decoration: none;
      padding: 12px 24px;
      background: #111827;
      color: white;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.2s;
  
      &:hover { 
        background: #3b82f6; 
        transform: translateY(-2px);
      }
    }

    .careers {
      --primary: #3b82f6;
      --text-main: #111827;
      --text-muted: #4b5563;
      --bg-alt: #f3f4f6;
  
      background: white;
      color: var(--text-main);
  
      &__container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 24px;
  
        &.grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding: 100px 24px;
        }
      }
  
      &__hero {
        padding: 120px 0 80px;
        text-align: center;
        background: linear-gradient(to bottom, #f8fafc, white);
      }
  
      &__title {
        font-size: clamp(2.5rem, 6vw, 4.5rem);
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 24px;
        .highlight { color: var(--primary); }
      }
  
      &__lead {
        font-size: 1.25rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
      }
  
      &__subtitle {
        font-size: 2.25rem;
        font-weight: 800;
        margin-bottom: 24px;
        &.centered { text-align: center; margin-bottom: 60px; }
      }
  
      &__text {
        font-size: 1.1rem;
        margin-bottom: 20px;
        color: var(--text-muted);
      }
  
      &__values {
        padding: 100px 0;
        background-color: var(--bg-alt);
      }

      &__visual {
        background: url(https://images.pexels.com/photos/4839763/pexels-photo-4839763.jpeg);
        background-size: contain;
        height: 100%;
      }
  
      .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 32px;
      }
  
      .value-card {
        &__title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--primary);
        }
        &__desc {
          color: var(--text-muted);
          font-size: 0.95rem;
        }
      }
  
      &__openings {
        padding: 100px 0;
      }
  
      .openings-header {
        margin-bottom: 48px;
        p { color: var(--text-muted); }
      }
  
      .job-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 32px 0;
        border-bottom: 1px solid #e5e7eb;
        transition: background 0.2s;
  
        &:first-child { border-top: 1px solid #e5e7eb; }
  
        &__title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
  
        &__meta {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
        }
  
        &__button {
          padding: 12px 24px;
          background: var(--text-main);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
  
          &:hover { 
            background: var(--primary); 
            transform: translateY(-2px);
          }
        }
      }
  
      &__speculative {
        margin-top: 60px;
        text-align: center;
        padding: 40px;
        background: var(--bg-alt);
        border-radius: 16px;
  
        .link {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          &:hover { text-decoration: underline; }
        }
      }
    }
  
    @media (max-width: 850px) {
      .careers__container.grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .job-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        
        &__button { width: 100%; }
      }
    }
  </style>