
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav");
    if (nav) {
        const toggle = document.createElement("button");
        toggle.className = "menu-toggle";
        toggle.type = "button";
        toggle.setAttribute("aria-label", "Toggle navigation");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
        nav.appendChild(toggle);
        toggle.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.textContent = open ? "×" : "☰";
        });

        const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
        nav.querySelectorAll("a").forEach(a => {
            const href = (a.getAttribute("href") || "").toLowerCase();
            if (href === current) a.classList.add("active");
        });
    }

    const revealTargets = document.querySelectorAll(
        ".main > section, .main > h2, .main > .pub, .card, .news, .item, .blog-card"
    );
    revealTargets.forEach(el => el.classList.add("reveal"));

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        revealTargets.forEach(el => observer.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add("visible"));
    }

    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.type = "button";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.textContent = "↑";
    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {
        topButton.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
