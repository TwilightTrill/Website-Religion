/* ============================================
   Buddhist Important Days Website
   JavaScript - Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initParticles();
    initBackToTop();
    initSmoothScroll();
    initCardHoverEffects();
    initAccessibilityToolbar();
    initCountdown();
    initDhammaQuiz();
    initVideoTabs();
});

/* ============ Loading Screen ============ */
function initLoadingScreen() {
    const loader = document.querySelector('.loading-screen');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 600);
        }, 800);
    });

    // Fallback: hide loader after 3 seconds
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }
    }, 3000);
}

/* ============ Navbar Scroll Effect ============ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ============ Mobile Menu Toggle ============ */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============ Scroll Reveal Animation ============ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ============ Floating Particles ============ */
function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const symbols = ['🪷', '✨', '🕯️', '☸️', '🙏', '💫', '⭐'];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, symbols);
    }
}

function createParticle(container, symbols) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left = Math.random() * 100;
    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * duration;
    const size = 0.8 + Math.random() * 0.8;

    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `-${delay}s`;
    particle.style.fontSize = `${size}rem`;

    container.appendChild(particle);
}

/* ============ Back to Top Button ============ */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============ Smooth Scroll for Anchor Links ============ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============ Card Hover Effects ============ */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.day-card, .video-card, .link-card, .activity-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ============ Accessibility & HCI Toolbar ============ */
function initAccessibilityToolbar() {
    // สร้างเครื่องมือขึ้นมาในหน้าจอ
    let toolbar = document.querySelector('.a11y-toolbar');
    if (!toolbar) {
        toolbar = document.createElement('div');
        toolbar.className = 'a11y-toolbar';
        toolbar.setAttribute('aria-label', 'Accessibility Controls');
        toolbar.innerHTML = `
            <span class="a11y-label">👁️ อักษร:</span>
            <button class="a11y-btn" id="fontDecBtn" title="ลดขนาดตัวอักษร" aria-label="Decrease Font Size">A-</button>
            <button class="a11y-btn active" id="fontResetBtn" title="ขนาดปกติ" aria-label="Reset Font Size">A</button>
            <button class="a11y-btn" id="fontIncBtn" title="เพิ่มขนาดตัวอักษร" aria-label="Increase Font Size">A+</button>
            <span style="width:1px;height:18px;background:rgba(212,168,71,0.3);margin:0 4px;"></span>
            <button class="a11y-btn" id="soundBtn" title="เสียงระฆังธรรมมะ (เจริญสติ)" aria-label="Play Dhamma Bell">🔔</button>
        `;
        document.body.appendChild(toolbar);
    }

    const decBtn = document.getElementById('fontDecBtn');
    const resetBtn = document.getElementById('fontResetBtn');
    const incBtn = document.getElementById('fontIncBtn');
    const soundBtn = document.getElementById('soundBtn');
    const rootElement = document.documentElement;

    // ดึงค่าขนาดตัวอักษรจาก localStorage 
    let currentScale = parseInt(localStorage.getItem('fontSizeScale')) || 100;

    // ฟังก์ชันปรับขนาด
    function updateFontSize(scale) {
        currentScale = scale;
        // ล็อกไม่ให้เล็กหรือใหญ่เกินไป
        if (currentScale > 150) currentScale = 150;
        if (currentScale < 80) currentScale = 80;

        // ปรับขนาดทั้งเว็บไซต์
        rootElement.style.fontSize = `${currentScale}%`;
        localStorage.setItem('fontSizeScale', currentScale);

        // จัดการสถานะปุ่ม (Active)
        [decBtn, resetBtn, incBtn].forEach(b => b && b.classList.remove('active'));
        if (currentScale < 100) {
            decBtn && decBtn.classList.add('active');
        } else if (currentScale > 100) {
            incBtn && incBtn.classList.add('active');
        } else {
            resetBtn && resetBtn.classList.add('active');
        }
    }

    // เรียกใช้ค่าเริ่มต้น
    updateFontSize(currentScale);

    // ทำงานเมื่อกดปุ่มตัวอักษร
    if (decBtn) decBtn.addEventListener('click', () => updateFontSize(currentScale - 10)); // ลด 10%
    if (resetBtn) resetBtn.addEventListener('click', () => updateFontSize(100)); // คืนค่าปกติ
    if (incBtn) incBtn.addEventListener('click', () => updateFontSize(currentScale + 10)); // เพิ่ม 10%

    // ทำงานเมื่อกดปุ่มเสียงกระดิ่ง
    if (soundBtn) soundBtn.addEventListener('click', () => {
        playDhammaChime();
        soundBtn.style.transform = 'scale(1.25) rotate(15deg)';
        setTimeout(() => soundBtn.style.transform = '', 300);
    });
}

/* ============ Web Audio API: Dhamma Chime ============ */
function playDhammaChime() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        // Sing bowl harmonic structure (Peaceful Tibetan/Thai Buddhist Bell Tone)
        const fundamental = 528; // 528 Hz frequency of calm
        const harmonics = [1, 2.76, 5.4, 8.93];
        const gains = [0.45, 0.2, 0.1, 0.05];

        harmonics.forEach((ratio, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(fundamental * ratio, ctx.currentTime);

            gain.gain.setValueAtTime(gains[idx], ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 3.2);
        });
    } catch (e) {
        console.log('Audio playback info:', e);
    }
}

/* ============ Countdown Timer ============ */
function initCountdown() {
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');
    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    // Target date for upcoming Buddhist Holy Day
    const now = new Date();
    let target = new Date(now.getFullYear(), 4, 22, 19, 0, 0); // May 22 (Visakha)
    if (now > target) {
        target = new Date(now.getFullYear(), 6, 20, 19, 0, 0); // July 20 (Asalha)
    }
    if (now > target) {
        target = new Date(now.getFullYear(), 9, 17, 19, 0, 0); // October 17 (Ok Phansa)
    }

    function update() {
        const diff = target.getTime() - new Date().getTime();
        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(d).padStart(2, '0');
        hoursEl.textContent = String(h).padStart(2, '0');
        minsEl.textContent = String(m).padStart(2, '0');
        secsEl.textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* ============ Dhamma Quiz ============ */
function initDhammaQuiz() {
    const container = document.getElementById('dhammaQuiz');
    if (!container) return;

    const questions = [
        {
            q: "วันใดที่มีพระสงฆ์ 1,250 รูป มาประชุมพร้อมกันโดยมิได้นัดหมาย และเป็นพระอรหันต์ที่บวชโดยตรงจากพระพุทธเจ้า?",
            options: [
                "วันวิสาขบูชา",
                "วันมาฆบูชา",
                "วันอาสาฬหบูชา",
                "วันเข้าพรรษา"
            ],
            answer: 1,
            explain: "วันมาฆบูชา เป็นวันจาตุรงคสันนิบาต เกิดเหตุอัศจรรย์ 4 ประการ รวมถึงพระอรหันต์ 1,250 รูปมาชุมนุมพร้อมกันโดยมิได้นัดหมาย ณ วัดเวฬุวันมหาวิหาร"
        },
        {
            q: "เหตุการณ์ใดที่เกิดขึ้นใน 'วันวิสาขบูชา' ซึ่งตรงกันทั้ง 3 เหตุการณ์ในวันเพ็ญขึ้น 15 ค่ำ เดือน 6?",
            options: [
                "แสดงปฐมเทศนา, บวชพระสงฆ์รูปแรก, ปรินิพพาน",
                "ประชุมพระสงฆ์ 1,250 รูป, แสดงโอวาทปาฏิโมกข์, ก่อตั้งศาสนา",
                "ประสูติ, ตรัสรู้, เสด็จดับขันธปรินิพพาน",
                "เข้าพรรษา, ออกพรรษา, เทศน์มหาชาติ"
            ],
            answer: 2,
            explain: "วันวิสาขบูชา เป็นวันที่พระสัมมาสัมพุทธเจ้า ประสูติ ตรัสรู้ และเสด็จดับขันธปรินิพพาน ตรงกันอย่างน่าอัศจรรย์ ได้รับการยกย่องเป็นวันสำคัญสากลของโลกจาก UNESCO"
        },
        {
            q: "วันที่มีพระรัตนตรัยครบองค์สาม (พระพุทธ พระธรรม พระสงฆ์) เกิดขึ้นครั้งแรกในวันใด?",
            options: [
                "วันอาสาฬหบูชา",
                "วันมาฆบูชา",
                "วันออกพรรษา",
                "วันอัฏฐมีบูชา"
            ],
            answer: 0,
            explain: "วันอาสาฬหบูชา ทรงแสดงปฐมเทศนา 'ธัมมจักกัปปวัตตนสูตร' ทำให้ท่านโกณฑัญญะได้ดวงตาเห็นธรรมและขอบวช จึงมีพระสงฆ์รูปแรกและมีพระรัตนตรัยครบองค์สาม"
        },
        {
            q: "พระภิกษุสงฆ์ต้องจำพรรษาตลอดระยะเวลากี่เดือนในช่วงฤดูฝนใน 'วันเข้าพรรษา'?",
            options: [
                "1 เดือน",
                "2 เดือน",
                "3 เดือน",
                "6 เดือน"
            ],
            answer: 2,
            explain: "พระภิกษุสงฆ์ต้องอยู่จำพรรษา ณ วัดใดวัดหนึ่งเป็นเวลา 3 เดือนตลอดฤดูฝน โดยไม่ไปค้างแรมที่อื่น เพื่อปฏิบัติธรรมและป้องกันการเหยียบย่ำพืชผลของชาวบ้าน"
        },
        {
            q: "วันออกพรรษา มีชื่อเรียกตามพระวินัยอีกชื่อหนึ่งว่าอะไร และมีประเพณีสำคัญยิ่งในวันรุ่งขึ้นคืออะไร?",
            options: [
                "วันจาตุรงคสันนิบาต - ประเพณีแห่เทียน",
                "วันมหาปวารณา - ประเพณีตักบาตรเทโวโรหณะ",
                "วันกตัญญูแห่งชาติ - ประเพณีเวียนเทียน",
                "วันวิสาขบูชา - ประเพณีสรงน้ำพระ"
            ],
            answer: 1,
            explain: "วันออกพรรษา เรียกว่า 'วันมหาปวารณา' ซึ่งพระสงฆ์จะเปิดโอกาสให้ว่ากล่าวตักเตือนกันได้ และวันรุ่งขึ้นจะมีประเพณีตักบาตรเทโวโรหณะ (ตักบาตรเทโว)"
        }
    ];

    let currentIdx = 0;
    let score = 0;

    function renderQuestion() {
        const item = questions[currentIdx];
        container.innerHTML = `
            <div class="quiz-wrapper reveal visible">
                <div class="quiz-header">
                    <span class="quiz-step">คำถามที่ ${currentIdx + 1} จาก ${questions.length}</span>
                    <span class="quiz-score-badge">คะแนน: ${score}</span>
                </div>
                <div class="quiz-question">${item.q}</div>
                <div class="quiz-options" id="quizOptions">
                    ${item.options.map((opt, i) => `
                        <button class="quiz-opt-btn" data-index="${i}">
                            <span style="font-weight:700;color:var(--text-gold);">${['ก', 'ข', 'ค', 'ง'][i]}.</span>
                            <span>${opt}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-feedback-box" id="quizFeedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-primary" id="quizNextBtn" style="display:none;">ข้อถัดไป →</button>
                </div>
            </div>
        `;

        const optBtns = container.querySelectorAll('.quiz-opt-btn');
        const feedback = container.querySelector('#quizFeedback');
        const nextBtn = container.querySelector('#quizNextBtn');

        optBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedIdx = parseInt(btn.getAttribute('data-index'));
                optBtns.forEach(b => b.disabled = true);

                if (selectedIdx === item.answer) {
                    btn.classList.add('correct');
                    score++;
                    feedback.className = 'quiz-feedback-box show correct';
                    feedback.innerHTML = `<strong>✨ ถูกต้องยอดเยี่ยม!</strong><br>${item.explain}`;
                } else {
                    btn.classList.add('wrong');
                    optBtns[item.answer].classList.add('correct');
                    feedback.className = 'quiz-feedback-box show wrong';
                    feedback.innerHTML = `<strong>💡 ยังไม่ถูกต้อง:</strong><br>${item.explain}`;
                }

                container.querySelector('.quiz-score-badge').textContent = `คะแนน: ${score}`;
                nextBtn.style.display = 'inline-flex';
            });
        });

        nextBtn.addEventListener('click', () => {
            currentIdx++;
            if (currentIdx < questions.length) {
                renderQuestion();
            } else {
                renderResult();
            }
        });
    }

    function renderResult() {
        let badge = '🪷';
        let title = 'พุทธศาสนิกชนผู้ใฝ่รู้';
        let desc = 'ท่านมีความรู้ความเข้าใจในวันสำคัญทางพระพุทธศาสนาเป็นอย่างดี ขออนุโมทนาในกุศลจิต!';

        if (score === 5) {
            badge = '🏆';
            title = 'ยอดเยี่ยมระดับบัณฑิตธรรมะ (5/5 เต็ม!)';
            desc = 'ท่านมีความรู้ความเข้าใจในวันสำคัญและหลักธรรมทางพระพุทธศาสนาอย่างลึกซึ้ง ครบถ้วนทุกประการ!';
        } else if (score >= 3) {
            badge = '⭐';
            title = 'ระดับกัลยาณมิตรผู้มีปัญญา (คะแนน ' + score + '/5)';
            desc = 'ท่านมีความรู้พื้นฐานในวันสำคัญทางศาสนาที่ดีมาก สามารถศึกษาเพิ่มเติมจากแต่ละหน้าเว็บเพื่อความรู้ที่สมบูรณ์ยิ่งขึ้น';
        } else {
            badge = '🕯️';
            title = 'ผู้เริ่มต้นเรียนรู้ทางธรรม (คะแนน ' + score + '/5)';
            desc = 'ร่วมศึกษาและอ่านเนื้อหาวันสำคัญต่างๆ บนเว็บไซต์นี้เพื่อเพิ่มพูนความรู้ความเข้าใจในพระพุทธศาสนาต่อไปได้เลย!';
        }

        container.innerHTML = `
            <div class="quiz-wrapper reveal visible">
                <div class="quiz-result-view">
                    <div class="quiz-result-badge">${badge}</div>
                    <h3 class="quiz-result-title">${title}</h3>
                    <p class="quiz-result-desc">${desc}</p>
                    <button class="btn btn-primary" id="quizRestartBtn">🔄 ลองทำแบบทดสอบอีกครั้ง</button>
                </div>
            </div>
        `;

        container.querySelector('#quizRestartBtn').addEventListener('click', () => {
            currentIdx = 0;
            score = 0;
            renderQuestion();
        });
    }

    renderQuestion();
}

/* ============ Video Filter Tabs ============ */
function initVideoTabs() {
    const tabs = document.querySelectorAll('.video-tab');
    const cards = document.querySelectorAll('.video-card-item');
    if (tabs.length === 0 || cards.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-filter');

            cards.forEach(card => {
                const cardCat = card.getAttribute('data-platform');
                if (category === 'all' || cardCat === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ============ Utility: Active Nav Link ============ */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Set active link on load
setActiveNavLink();