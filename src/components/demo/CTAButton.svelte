<script lang="ts">
  export let label: string;
  export let href: string;
  export let variant: 'primary' | 'secondary' = 'primary';
  export let target: string = '';
</script>

<a {href} {target} class="cta-button" class:primary={variant === 'primary'} class:secondary={variant === 'secondary'}>
  {label}
</a>

<style lang="scss">
  .cta-button {
    display: inline-block;
    padding: 0.8rem 1.6rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }

  .primary {
    background-color: #2a4d7a;
    color: #fff;
    box-shadow: 0 4px 12px rgba(42, 77, 122, 0.2);

    &:hover {
      background-color: #1e3a5f;
      box-shadow: 0 6px 16px rgba(42, 77, 122, 0.3);
    }
  }

  .secondary {
    background-color: #e6f0fa;
    color: #1a2a3a;
    border: 1px solid #2a4d7a;

    &:hover {
      background-color: #d0e4fa;
      color: #17406a;
    }
  }
</style>
