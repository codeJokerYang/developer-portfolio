"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  index: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  visual: string;
  metrics: string[];
  contribution: string;
  detail: string;
  result: string;
  repo: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "AgentTrainHub",
    category: "FULL-STACK / AI PLATFORM",
    description: "面向算法训练场景的实验管理平台，覆盖身份认证、数据集管理、任务配置与训练状态可视化。",
    tags: ["Java 17", "Spring Boot", "Vue 3", "MySQL"],
    visual: "visual-dashboard",
    metrics: ["JWT 认证", "数据集管理", "训练工作流"],
    contribution: "系统设计 · 前后端开发 · 工程化",
    detail: "采用 Spring Security、MyBatis-Plus、Redis 与 JWT 构建后端，Vue 3、Pinia 和 Element Plus 负责可视化工作台，并预留 Python Worker 与 Agent 能力。",
    result: "公开版本已完成登录认证和数据集完整链路，前后端构建通过，训练任务与实时进度能力持续迭代中。",
    repo: "https://github.com/codeJokerYang/agent-train-hub",
  },
  {
    index: "02",
    title: "AI Factory",
    category: "AI ENGINEERING / WORKFLOW",
    description: "面向个人开发者的 AI 协同研发工作流，把需求、架构、编码、测试与评审串成可复用流程。",
    tags: ["LangGraph", "Pydantic", "pytest", "GitHub Actions"],
    visual: "visual-orbit",
    metrics: ["任务编排", "质量栅栏", "知识沉淀"],
    contribution: "工作流设计 · Agent 编排 · 质量策略",
    detail: "通过结构化 Spec、LLM Wiki、MCP 与 Git 安全栅栏组织多模型协作，让 AI 参与实现的同时保留人工决策和质量控制。",
    result: "形成从需求拆解到 Pull Request 的七步协作流程，并沉淀架构决策、运行手册与代码规范模板。",
    repo: "https://github.com/codeJokerYang/ai-factory",
  },
  {
    index: "03",
    title: "sanwenLearning",
    category: "HARMONYOS / MOBILE",
    description: "围绕 HarmonyOS 应用结构、ArkTS 组件与多端工程实践持续积累的移动应用实验仓库。",
    tags: ["HarmonyOS", "ArkTS", "AppScope", "Hvigor"],
    visual: "visual-store",
    metrics: ["原生界面", "工程配置", "多端探索"],
    contribution: "移动端实践 · 工程规范 · 持续学习",
    detail: "仓库包含标准 HarmonyOS 工程结构、AppScope、构建配置和开发规范，用于验证原生界面组织与多 Agent 辅助开发方式。",
    result: "以公开学习仓库的方式持续记录移动端工程实践，作为 Kotlin、Compose 与 HarmonyOS 能力的延伸。",
    repo: "https://github.com/codeJokerYang/sanwenLearning",
  },
];

const capabilities = [
  { number: "01", symbol: "{ }", title: "Java 全栈开发", text: "使用 Spring Boot、MyBatis、MySQL 与 Vue 构建从接口、权限到可视化界面的完整产品链路。" },
  { number: "02", symbol: "AI", title: "Agent 工作流", text: "关注 LangGraph、Spring AI、Prompt 设计、工具调用与上下文管理，让 AI 能力真正进入工程流程。" },
  { number: "03", symbol: "◎", title: "多端与视觉工程", text: "持续探索 Kotlin、Jetpack Compose、HarmonyOS 和机器视觉，在不同终端上完成可靠交付。" },
];

const sections = [
  { id: "work", label: "作品" },
  { id: "about", label: "能力" },
  { id: "contact", label: "联系" },
];

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "codeJokerYang Developer Portfolio",
  description: "Java 全栈、AI Agent 与多端应用公开作品集。",
  mainEntity: {
    "@type": "Person",
    alternateName: "codeJokerYang",
    url: "https://github.com/codeJokerYang",
    sameAs: ["https://github.com/codeJokerYang"],
    knowsAbout: ["Java", "Spring Boot", "AI Agent", "Vue 3", "HarmonyOS"],
  },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("top");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const pointer = { x: width * 0.72, y: height * 0.34, active: false };

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    };

    const palette = ["108, 86, 255", "200, 255, 61", "72, 176, 255"];
    let particles: Particle[] = [];

    const createParticle = (x = Math.random() * width, y = Math.random() * height): Particle => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.34,
      radius: 0.8 + Math.random() * 1.7,
      color: palette[Math.floor(Math.random() * palette.length)],
      pulse: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const particleCount = Math.min(width < 700 ? 42 : 88, Math.max(28, Math.floor((width * height) / 15000)));
      particles = Array.from({ length: particleCount }, () => createParticle());
    };

    const updatePointerPosition = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const releasePointer = () => { pointer.active = false; };

    const createBurst = (event: PointerEvent) => {
      if (!particlesEnabled || reduceMotion) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      for (let index = 0; index < Math.min(10, particles.length); index += 1) {
        const particle = particles[index];
        const angle = (Math.PI * 2 * index) / 10 + Math.random() * 0.35;
        const speed = 0.7 + Math.random() * 1.5;
        particle.x = pointer.x;
        particle.y = pointer.y;
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed;
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!reduceMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.pulse += 0.018;

          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < 155) {
              const force = (1 - distance / 155) * 0.028;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }

          particle.vx *= 0.992;
          particle.vy *= 0.992;
          if (particle.x < -20) particle.x = width + 20;
          if (particle.x > width + 20) particle.x = -20;
          if (particle.y < -20) particle.y = height + 20;
          if (particle.y > height + 20) particle.y = -20;
        }

        const pulse = 0.76 + Math.sin(particle.pulse) * 0.24;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = `rgba(${particle.color}, ${0.36 + pulse * 0.22})`;
        context.fill();
      });

      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const a = particles[first];
          const b = particles[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 104) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(101, 85, 255, ${(1 - distance / 104) * 0.14})`;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }
      }

      if (pointer.active && !reduceMotion) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 115);
        glow.addColorStop(0, "rgba(200, 255, 61, .10)");
        glow.addColorStop(1, "rgba(200, 255, 61, 0)");
        context.fillStyle = glow;
        context.fillRect(pointer.x - 115, pointer.y - 115, 230, 230);
      }

      if (!reduceMotion && particlesEnabled) animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    if (particlesEnabled) draw();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", updatePointerPosition, { passive: true });
    window.addEventListener("pointerleave", releasePointer);
    window.addEventListener("pointerdown", createBurst, { passive: true });
    document.addEventListener("visibilitychange", releasePointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointerPosition);
      window.removeEventListener("pointerleave", releasePointer);
      window.removeEventListener("pointerdown", createBurst);
      document.removeEventListener("visibilitychange", releasePointer);
      context.clearRect(0, 0, width, height);
    };
  }, [particlesEnabled]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.13 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => sectionObserver.observe(section));
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${value})`);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const updatePointer = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  const updateTilt = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    event.currentTarget.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
    event.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    event.currentTarget.style.setProperty("--my", `${y * 100}%`);
  };

  const resetTilt = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />
      <canvas className={`particle-field ${particlesEnabled ? "is-active" : ""}`} ref={particleCanvasRef} aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="回到首页" onClick={closeMenu}>CJY<span>.</span></a>
        <nav className="desktop-nav" aria-label="主导航">
          {sections.map((section) => (
            <a className={activeSection === section.id ? "active" : ""} href={`#${section.id}`} key={section.id}>
              <span>{section.label}</span><i />
            </a>
          ))}
        </nav>
        <a className="header-contact" href="https://github.com/codeJokerYang" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>
        <button className="menu-button" type="button" aria-label="打开菜单" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div>
          {sections.map((section, index) => (
            <a href={`#${section.id}`} onClick={closeMenu} key={section.id}><small>0{index + 1}</small>{section.label}<span>↗</span></a>
          ))}
        </div>
        <p>@codeJokerYang · Public Developer Profile<br />仅展示公开技术信息</p>
      </div>

      <nav className={`mobile-dock ${menuOpen ? "menu-open" : ""}`} aria-label="移动端快捷导航">
        {sections.map((section) => (
          <a className={activeSection === section.id ? "active" : ""} aria-current={activeSection === section.id ? "page" : undefined} href={`#${section.id}`} key={section.id}>
            <i aria-hidden="true" />
            <span>{section.label}</span>
          </a>
        ))}
      </nav>

      <section className="hero shell" id="top" onPointerMove={updatePointer}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <div className="eyebrow"><span className="status-dot" /> PUBLIC DEV PROFILE · 2026</div>
          <button
            className={`particle-control ${particlesEnabled ? "active" : ""}`}
            type="button"
            aria-pressed={particlesEnabled}
            onClick={() => setParticlesEnabled((value) => !value)}
          >
            <i aria-hidden="true"><span /><span /><span /></i>
            PARTICLE FIELD · {particlesEnabled ? "ON" : "OFF"}
          </button>
          <h1>让后端、Agent<br />与<span>交互体验</span>协同。</h1>
          <p className="hero-intro">我是 codeJokerYang，关注 Java 全栈、AI Agent 与多端应用。喜欢把系统设计、可靠代码和清晰界面组合成真正可以运行的产品。</p>
          <div className="hero-actions">
            <a className="button button-primary magnetic" href="#work"><span>浏览作品</span><b>↘</b></a>
            <a className="button button-ghost magnetic" href="https://github.com/codeJokerYang" target="_blank" rel="noopener noreferrer"><span>访问 GitHub</span><b>↗</b></a>
          </div>
          <div className="quick-facts">
            <div><strong>03</strong><span>PUBLIC REPOS</span></div>
            <div><strong>05</strong><span>PROJECT TRACKS</span></div>
            <div><strong>∞</strong><span>STAY CURIOUS</span></div>
          </div>
        </div>

        <div className="hero-art" data-reveal onPointerMove={updateTilt} onPointerLeave={resetTilt}>
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two"><span>DESIGN · BUILD · ITERATE ·</span></div>
          <div className="code-window">
            <div className="window-top"><i /><i /><i /><span>codeJokerYang.profile</span></div>
            <pre><code><span className="code-purple">const</span> developer = {'{'}{`\n`}  focus: <span className="code-green">&quot;Java + Agent&quot;</span>,{`\n`}  interfaces: [<span className="code-green">&quot;Web&quot;</span>, <span className="code-green">&quot;Mobile&quot;</span>],{`\n`}  learning: <span className="code-blue">true</span>{`\n`}{'}'}</code></pre>
            <div className="code-result"><span>●</span> Public projects are always evolving.</div>
          </div>
          <div className="float-card card-react">J<span>Java</span></div>
          <div className="float-card card-type">AI<span>LangGraph</span></div>
          <div className="float-card card-node">V3<span>Vue 3</span></div>
          <div className="motion-badge"><i /> LIVE MOTION</div>
          <div className="drag-hint">MOVE CURSOR <span>↗</span></div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>JAVA FULL-STACK <span>✦</span> AI AGENT <span>✦</span> MOBILE ENGINEERING <span>✦</span> JAVA FULL-STACK <span>✦</span> AI AGENT <span>✦</span> MOBILE ENGINEERING <span>✦</span></div>
      </div>

      <section className="work-section shell" id="work">
        <div className="section-heading" data-reveal>
          <div><span className="section-no">/ 01</span><h2>公开项目</h2></div>
          <p>内容来自 GitHub 公开仓库，<br />选择卡片查看实现与进展。</p>
        </div>
        <div className="projects">
          {projects.map((project) => {
            const isOpen = openProject === project.index;
            return (
              <article
                className={`project-card ${isOpen ? "expanded" : ""}`}
                id={`project-${project.index}`}
                key={project.title}
                data-reveal
                onPointerMove={updatePointer}
              >
                <button className="project-summary" type="button" aria-expanded={isOpen} onClick={() => setOpenProject(isOpen ? null : project.index)}>
                  <div className={`project-visual ${project.visual}`}>
                    <div className="mini-toolbar"><span /><span /><span /></div>
                    <div className="mock-sidebar"><i /><i /><i /><i /></div>
                    <div className="mock-content">
                      <div className="mock-head"><div className="mock-title" /><span>LIVE</span></div>
                      <div className="mock-row">{project.metrics.map((metric) => <div key={metric}><strong>{metric}</strong><i /></div>)}</div>
                      <div className="mock-chart"><b /><b /><b /><b /><b /><b /></div>
                    </div>
                    <span className="visual-cursor">VIEW ↗</span>
                  </div>
                  <div className="project-info">
                    <div className="project-index">{project.index}</div>
                    <div className="project-body">
                      <span className="project-category">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-role">我的工作 · {project.contribution}</div>
                      <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                    <span className="project-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </div>
                </button>
                <div className="project-detail" aria-hidden={!isOpen}>
                  <div><small>DESIGN NOTE</small><p>{project.detail}</p></div>
                  <div><small>OUTCOME</small><p>{project.result}</p></div>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">查看 GitHub <span>↗</span></a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="shell">
          <div className="section-heading light-heading" data-reveal>
            <div><span className="section-no">/ 02</span><h2>技术方向</h2></div>
            <p>从后端服务到交互界面，<br />持续拓展完整工程能力。</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability-card" key={item.number} data-reveal onPointerMove={updatePointer}>
                <span className="capability-number">{item.number}</span>
                <div className="capability-symbol">{item.symbol}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <i aria-hidden="true">探索细节 ↗</i>
              </article>
            ))}
          </div>
          <div className="stack-row" data-reveal><span>技术栈</span><div>Java</div><div>Spring Boot</div><div>Vue 3</div><div>Python</div><div>MySQL</div><div>Git</div></div>
          <div className="achievement-row" data-reveal>
            <span>简历提炼 · 已脱敏</span>
            <div><b>AI 视觉检测</b><small>全国级竞赛一等奖</small></div>
            <div><b>软件设计</b><small>全国级竞赛二等奖</small></div>
            <div><b>专业认证</b><small>AI 架构与鸿蒙开发方向</small></div>
          </div>
        </div>
      </section>

      <section className="contact-section shell" id="contact" onPointerMove={updatePointer}>
        <div className="contact-orb" aria-hidden="true" />
        <span className="section-no" data-reveal>/ 03</span>
        <div className="contact-grid" data-reveal>
          <h2>继续查看代码，<br /><span>从公开项目认识我。</span></h2>
          <div className="contact-copy">
            <p>这里仅展示可公开的技术内容。更多代码、更新记录和项目文档，可以前往 GitHub 查看。</p>
            <a className="github-link" href="https://github.com/codeJokerYang" target="_blank" rel="noopener noreferrer">
              <span>github.com/codeJokerYang</span><b>↗</b>
            </a>
          </div>
        </div>
      </section>

      <footer className="shell">
        <a className="brand" href="#top">CJY<span>.</span></a>
        <p>© 2026 codeJokerYang · Public developer portfolio</p>
        <div><a href="#work">Projects ↗</a><a href="https://github.com/codeJokerYang" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
      </footer>
    </main>
  );
}
