<script lang="ts">
    import { fade, fly } from "svelte/transition";

    const projects = [
        {
            name: "Engagement AI",
            url: "https://aibanewsletter.club",
            desc: "Our flagship IRP system for automated audience growth.",
        },
        {
            name: "AI Philosopher",
            url: "https://github.com",
            desc: "Exploring recursive logic and human-AI interaction.",
        },
        {
            name: "Recursive Maths",
            url: "https://github.com",
            desc: "Mathematical frameworks for scalable systems.",
        },
        {
            name: "3D Web Preset",
            url: "https://github.com",
            desc: "High-performance components for the modern web.",
        },
        {
            name: "Truth Tables",
            url: "https://github.com",
            desc: "Logic verification tools for complex automations.",
        },
        {
            name: "People Do Network",
            url: "https://github.com",
            desc: "Human-centric networking in an automated world.",
        },
    ];
</script>

<svelte:head>
    <title>About Us • A I B A N</title>
</svelte:head>

<main class="about">
    <section class="about__hero" in:fade={{ duration: 800 }}>
        <div class="about__container">
            <span class="about__badge">Our Philosophy</span>
            <h1 class="about__title">
                We turn job-trapped founders into <span class="highlight"
                    >owners</span
                >.
            </h1>
            <p class="about__lead">
                Most people with great ideas get stuck. Not because they lack
                talent, but because they don’t know where to start, or which
                path to choose.
            </p>
        </div>
    </section>

    <section class="about__mission">
        <div class="about__container grid">
            <div class="about__content">
                <h2 class="about__subtitle">Why we exist</h2>
                <p class="about__text">
                    If a business falls apart without the owner, it’s not a
                    business, it’s a job. We help business owners grow their
                    companies in a way that sets them free from running the
                    company day‑to‑day.
                </p>
                <blockquote class="about__quote">
                    "We want humans to do what humans do best: <strong
                        >explore</strong
                    >."
                </blockquote>
            </div>
            <div class="about__visual">
                <div class="abstract-lever">
                    <div class="lever-arm"></div>
                    <div class="lever-pivot"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="about__how">
        <div class="about__container">
            <h2 class="about__subtitle centered">The AIBAN Method</h2>
            <div class="about__steps">
                <div class="step">
                    <span class="step__num">01</span>
                    <h3>Build Systems Fast</h3>
                    <p>
                        We take your ideas and turn them into real, functional
                        systems in days, not months.
                    </p>
                </div>
                <div class="step">
                    <span class="step__num">02</span>
                    <h3>Automate Execution</h3>
                    <p>
                        We organize your business so it works while you sleep.
                        Systems scale leverage.
                    </p>
                </div>
                <div class="step">
                    <span class="step__num">03</span>
                    <h3>Multiply Reach</h3>
                    <p>
                        We grow your business by multiplying your impact without
                        multiplying your work.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="about__identity">
        <div class="about__container">
            <div class="identity-card">
                <h2 class="about__subtitle">What are we?</h2>
                <p class="about__text">
                    We are systems, automation, and
                    execution. Capital scales effort, but systems scale
                    leverage.
                </p>
                <p class="about__disclaimer">
                    Delivered through platform
                    subscriptions. Leveraging our web
                    services and the automation provided for your business
                    processes.
                </p>
            </div>
        </div>
    </section>

    <!-- <section class="about__projects">
        <div class="about__container">
            <h2 class="about__subtitle centered">The Ecosystem</h2>
            <div class="project-grid">
                {#each projects as project}
                    <a href={project.url} target="_blank" class="project-card">
                        <h4 class="project-card__title">{project.name}</h4>
                        <p class="project-card__desc">{project.desc}</p>
                        <span class="project-card__link">View Source →</span>
                    </a>
                {/each}
            </div>
        </div>
    </section> -->
</main>

<style lang="scss">
    .about {
        --primary: #3b82f6;
        --text-main: #1f2937;
        --text-muted: #6b7280;
        --bg-light: #f9fafb;

        background: white;
        color: var(--text-main);
        line-height: 1.6;
        padding-top: 80px;

        &__container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;

            &.grid {
                display: grid;
                grid-template-columns: 1.2fr 0.8fr;
                gap: 60px;
                align-items: center;
            }
        }

        &__hero {
            padding: 100px 0;
            text-align: center;
            background: radial-gradient(
                circle at top right,
                #eff6ff 0%,
                transparent 40%
            );
        }

        &__badge {
            display: inline-block;
            padding: 6px 16px;
            background: #dbeafe;
            color: var(--primary);
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.875rem;
            margin-bottom: 24px;
        }

        &__title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 24px;

            .highlight {
                color: var(--primary);
            }
        }

        &__lead {
            font-size: 1.25rem;
            color: var(--text-muted);
            max-width: 700px;
            margin: 0 auto;
        }

        &__subtitle {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 24px;
            &.centered {
                text-align: center;
                margin-bottom: 60px;
            }
        }

        &__mission {
            padding: 80px 0;
        }

        &__text {
            font-size: 1.125rem;
            color: var(--text-muted);
            margin-bottom: 24px;
        }

        &__quote {
            border-left: 4px solid var(--primary);
            padding-left: 24px;
            font-size: 1.5rem;
            font-style: italic;
            color: var(--text-main);
            margin: 40px 0;
        }

        &__how {
            background: var(--bg-light);
            padding: 100px 0;
        }

        &__steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 32px;
        }

        .step {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

            &__num {
                font-size: 3rem;
                font-weight: 800;
                color: #e5e7eb;
                display: block;
                margin-bottom: 16px;
            }

            h3 {
                font-size: 1.25rem;
                font-weight: 700;
                margin-bottom: 12px;
            }
            p {
                color: var(--text-muted);
            }
        }

        &__identity {
            padding: 100px 0;
            .identity-card {
                background: #111827;
                color: white;
                padding: 60px;
                border-radius: 24px;
                text-align: center;

                .about__subtitle {
                    color: white;
                }
                .about__text {
                    color: #9ca3af;
                }
            }
            .about__disclaimer {
                font-size: 0.875rem;
                color: #6b7280;
                margin-top: 32px;
                font-style: italic;
            }
        }

        &__projects {
            padding: 100px 0;
        }

        .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }

        .project-card {
            text-decoration: none;
            color: inherit;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            transition: all 0.3s ease;

            &:hover {
                border-color: var(--primary);
                transform: translateY(-4px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

            &__title {
                font-weight: 700;
                margin-bottom: 8px;
                color: var(--primary);
            }
            &__desc {
                font-size: 0.9rem;
                color: var(--text-muted);
                margin-bottom: 16px;
            }
            &__link {
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                color: var(--text-main);
            }
        }

        // Visual Lever Animation
        .abstract-lever {
            position: relative;
            height: 200px;
            width: 200px;
            margin: 0 auto;

            .lever-arm {
                position: absolute;
                top: 50%;
                left: 10%;
                width: 80%;
                height: 8px;
                background: var(--primary);
                transform-origin: 60% 50%;
                transform: rotate(-20deg);
                border-radius: 4px;
            }
            .lever-pivot {
                position: absolute;
                top: 50%;
                left: 55%;
                width: 30px;
                height: 30px;
                background: #111827;
                transform: translate(-50%, -50%);
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            }
        }
    }

    @media (max-width: 850px) {
        .about__container.grid {
            grid-template-columns: 1fr;
        }
        .about__hero {
            padding: 60px 0;
        }
    }
</style>
