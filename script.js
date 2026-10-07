"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const state = {
        vibe: "Explore",
        mission: null,
        countdown: 10,
        countdownId: null,
        history: []
    };

    const missionTemplates = {
        Explore: [
            {
                title: "The Three-Turn Walk",
                description:
                    "Leave your usual route and take three turns you've never taken before. Notice what changes when you stop following the path you normally use.",
                steps: [
                    "Start somewhere familiar.",
                    "Take three different turns than you normally would.",
                    "Notice one interesting thing at each turn.",
                    "Come back without taking photos."
                ],
                rule:
                    "You cannot use your phone to navigate unless you are genuinely lost or unsafe."
            },

            {
                title: "Find the Unexpected",
                description:
                    "Walk around your area and find five things you normally walk past without noticing.",
                steps: [
                    "Walk for five minutes.",
                    "Look above eye level.",
                    "Look close to the ground.",
                    "Find five details you have never noticed before."
                ],
                rule:
                    "No photographs. Remember the five things instead."
            }
        ],

        Move: [
            {
                title: "Twenty-Minute Body Reset",
                description:
                    "Give your body twenty minutes of simple movement without tracking steps, calories, distance, or performance.",
                steps: [
                    "Walk for five minutes.",
                    "Stretch gently for five minutes.",
                    "Walk a little faster for five minutes.",
                    "Finish with five minutes of relaxed movement."
                ],
                rule:
                    "There are no numbers to beat."
            },

            {
                title: "Choose Your Direction",
                description:
                    "Go outside and let your surroundings decide where you move next.",
                steps: [
                    "Start walking.",
                    "At every safe intersection, choose a direction you normally wouldn't.",
                    "Continue for the planned time.",
                    "Return to your starting point."
                ],
                rule:
                    "Safety always beats the mission."
            }
        ],

        Create: [
            {
                title: "Make Something From Nothing",
                description:
                    "Use whatever ordinary materials are around you to create something completely unnecessary but interesting.",
                steps: [
                    "Find three safe objects.",
                    "Combine them into something new.",
                    "Give your creation a name.",
                    "Leave the objects as you found them."
                ],
                rule:
                    "Nothing needs to be photographed or posted."
            },

            {
                title: "Outdoor Sketch",
                description:
                    "Find something interesting outside and spend twenty minutes drawing it.",
                steps: [
                    "Choose a simple object or scene.",
                    "Observe it for two minutes.",
                    "Draw what you see.",
                    "Keep adding small details."
                ],
                rule:
                    "The drawing does not need to be good."
            }
        ],

        Notice: [
            {
                title: "Five-Sense Hunt",
                description:
                    "Slow down and deliberately notice what your environment is telling you.",
                steps: [
                    "Find something you can see.",
                    "Notice two different sounds.",
                    "Notice the temperature or wind.",
                    "Notice a smell.",
                    "Touch one safe natural surface."
                ],
                rule:
                    "Do not record any of it digitally."
            },

            {
                title: "The Slow Walk",
                description:
                    "Walk slower than usual and pay attention to details that normally disappear into the background.",
                steps: [
                    "Walk somewhere familiar.",
                    "Reduce your normal walking speed.",
                    "Notice colors, textures and sounds.",
                    "Stop at three interesting points."
                ],
                rule:
                    "There is nowhere you need to post about this."
            }
        ],

        Connect: [
            {
                title: "Ask Someone Something",
                description:
                    "Spend time with another person and have a conversation you would normally replace with messaging.",
                steps: [
                    "Choose someone you know and trust.",
                    "Ask them an unusual but friendly question.",
                    "Listen without checking your phone.",
                    "Share your own answer too."
                ],
                rule:
                    "Phones stay out of the conversation."
            },

            {
                title: "Teach Me Something",
                description:
                    "Find someone who knows something you don't and ask them to teach you.",
                steps: [
                    "Choose someone you know.",
                    "Ask what they know well.",
                    "Let them explain it.",
                    "Try it yourself if it is safe."
                ],
                rule:
                    "Be curious instead of trying to document everything."
            }
        ],

        Calm: [
            {
                title: "Quiet Twenty",
                description:
                    "Find a comfortable, safe place and spend twenty minutes doing absolutely nothing digitally.",
                steps: [
                    "Find a safe and comfortable place.",
                    "Sit down.",
                    "Take a few slow breaths.",
                    "Notice what is happening around you.",
                    "Stay until the timer ends."
                ],
                rule:
                    "No music, videos, scrolling or notifications."
            },

            {
                title: "Cloud Watch",
                description:
                    "Look upward and let your attention wander without trying to accomplish anything.",
                steps: [
                    "Find a comfortable outdoor spot.",
                    "Look at the sky.",
                    "Notice cloud shapes and movement.",
                    "Let your thoughts come and go."
                ],
                rule:
                    "There is nothing to achieve."
            }
        ]
    };

    function getElement(id) {
        return document.getElementById(id);
    }

    function loadHistory() {
        try {
            const saved = localStorage.getItem("go_history");

            if (!saved) {
                state.history = [];
                return;
            }

            const parsed = JSON.parse(saved);

            state.history = Array.isArray(parsed)
                ? parsed
                : [];
        } catch (error) {
            console.warn(
                "Could not load mission history.",
                error
            );

            state.history = [];
        }
    }

    function saveHistory() {
        try {
            localStorage.setItem(
                "go_history",
                JSON.stringify(state.history)
            );
        } catch (error) {
            console.warn(
                "Could not save mission history.",
                error
            );
        }
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function getInputs() {
        const duration =
            Number(getElement("duration")?.value) || 20;

        const company =
            getElement("company")?.value || "solo";

        const place =
            getElement("place")?.value || "nearby";

        const extra =
            getElement("extra")?.value.trim() || "";

        return {
            vibe: state.vibe,
            duration,
            company,
            place,
            extra
        };
    }

    function randomItem(items) {
        if (!items || items.length === 0) {
            return null;
        }

        return items[
            Math.floor(Math.random() * items.length)
        ];
    }

    function generateDemoMission(input) {
        const options =
            missionTemplates[input.vibe] ||
            missionTemplates.Explore;

        const template = randomItem(options);

        if (!template) {
            return null;
        }

        let description = template.description;

        if (input.duration) {
            description += ` You have about ${input.duration} minutes for this mission.`;
        }

        if (input.extra) {
            description += ` Extra constraint: ${input.extra}.`;
        }

        return {
            title: template.title,
            vibe: input.vibe,
            duration: input.duration,
            description,
            steps: template.steps,
            rule: template.rule,
            company: input.company,
            place: input.place,
            extra: input.extra
        };
    }

    /*
     * OPEN-WEIGHT AI HOOK
     *
     * This function is intentionally empty for now.
     *
     * Later we can connect this frontend to a local backend
     * running an open-weight model through Ollama or another
     * local inference server.
     *
     * IMPORTANT:
     * Never put a private API key directly into this browser
     * JavaScript file.
     */

    async function generateWithAI(input) {
        /*
        Example future request:
    
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(input)
        });
    
        if (!response.ok) {
          throw new Error("AI request failed.");
        }
    
        const data = await response.json();
    
        return data.mission;
        */

        return null;
    }

    function renderMission(mission) {
        if (!mission) {
            return;
        }

        state.mission = mission;

        const missionSection =
            getElement("missionSection");

        const title =
            getElement("missionTitle");

        const vibe =
            getElement("missionVibe");

        const duration =
            getElement("missionDuration");

        const description =
            getElement("missionDescription");

        const steps =
            getElement("missionSteps");

        const rule =
            getElement("missionRule");

        if (!missionSection) {
            return;
        }

        title.textContent =
            mission.title || "Your Mission";

        vibe.textContent =
            String(mission.vibe || state.vibe).toUpperCase();

        duration.textContent =
            `${mission.duration || 20} MIN`;

        description.textContent =
            mission.description || "";

        rule.textContent =
            mission.rule ||
            "Your phone stays in your pocket.";

        steps.innerHTML = "";

        const missionSteps =
            Array.isArray(mission.steps)
                ? mission.steps
                : [];

        missionSteps.forEach((step) => {
            const li =
                document.createElement("li");

            li.textContent = step;

            steps.appendChild(li);
        });

        missionSection.classList.remove("hidden");

        missionSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        resetCountdown();
    }

    function resetCountdown() {
        if (state.countdownId) {
            clearInterval(state.countdownId);
            state.countdownId = null;
        }

        state.countdown = 10;

        const countdown =
            getElement("countdown");

        const message =
            getElement("countdownMessage");

        const lockBtn =
            getElement("lockBtn");

        const completeBtn =
            getElement("completeBtn");

        if (countdown) {
            countdown.textContent = "10";
        }

        if (message) {
            message.textContent =
                "The countdown starts when you press the button.";
        }

        if (lockBtn) {
            lockBtn.disabled = false;
            lockBtn.textContent =
                "START 10-SECOND COUNTDOWN";
        }

        if (completeBtn) {
            completeBtn.disabled = true;
        }
    }

    function startCountdown() {
        if (state.countdownId) {
            return;
        }

        const countdown =
            getElement("countdown");

        const message =
            getElement("countdownMessage");

        const lockBtn =
            getElement("lockBtn");

        if (!countdown) {
            return;
        }

        state.countdown = 10;

        countdown.textContent =
            state.countdown;

        if (lockBtn) {
            lockBtn.disabled = true;
        }

        if (message) {
            message.textContent =
                "Put your phone somewhere you cannot casually reach it.";
        }

        state.countdownId = setInterval(() => {
            state.countdown -= 1;

            countdown.textContent =
                state.countdown;

            if (state.countdown <= 0) {
                clearInterval(state.countdownId);

                state.countdownId = null;

                countdown.textContent = "GO.";

                if (message) {
                    message.textContent =
                        "Screen off. Your mission starts now.";
                }

                if (getElement("completeBtn")) {
                    getElement("completeBtn").disabled = false;
                }

                logMissionStart();
            }
        }, 1000);
    }

    function logMissionStart() {
        if (!state.mission) {
            return;
        }

        const historyItem = {
            id: Date.now(),
            title: state.mission.title,
            vibe: state.mission.vibe,
            duration: state.mission.duration,
            startedAt: new Date().toISOString(),
            completed: false
        };

        state.history.unshift(historyItem);

        state.history =
            state.history.slice(0, 30);

        saveHistory();

        renderHistory();
    }

    function completeMission() {
        if (!state.mission) {
            return;
        }

        const item =
            state.history.find(
                (entry) =>
                    entry.title === state.mission.title &&
                    !entry.completed
            );

        if (item) {
            item.completed = true;
            item.completedAt =
                new Date().toISOString();
        }

        saveHistory();
        renderHistory();

        const completeBtn =
            getElement("completeBtn");

        if (completeBtn) {
            completeBtn.disabled = true;
            completeBtn.textContent =
                "MISSION COMPLETED ✓";
        }

        const message =
            getElement("countdownMessage");

        if (message) {
            message.textContent =
                "Nice. You actually went.";
        }
    }

    function renderHistory() {
        const container =
            getElement("historyList");

        if (!container) {
            return;
        }

        if (state.history.length === 0) {
            container.innerHTML =
                '<div class="empty-history">No missions yet.</div>';

            return;
        }

        container.innerHTML =
            state.history
                .map((item) => {
                    const status =
                        item.completed
                            ? "COMPLETED"
                            : "STARTED";

                    const duration =
                        Number(item.duration) || 20;

                    return `
            <div class="history-item">
              <div>
                <p class="history-title">
                  ${escapeHTML(item.title)}
                </p>

                <p class="history-meta">
                  ${escapeHTML(item.vibe)}
                  ·
                  ${duration} minutes
                </p>
              </div>

              <div class="history-status">
                ${status}
              </div>
            </div>
          `;
                })
                .join("");
    }

    async function createMission() {
        const button =
            getElement("createBtn");

        if (!button) {
            return;
        }

        const originalText =
            button.innerHTML;

        button.disabled = true;

        button.innerHTML =
            "<span>CREATING...</span><span>✦</span>";

        const input =
            getInputs();

        try {
            let mission = null;

            try {
                mission =
                    await generateWithAI(input);
            } catch (error) {
                console.warn(
                    "AI generation failed. Using offline demo mode.",
                    error
                );
            }

            if (!mission) {
                mission =
                    generateDemoMission(input);
            }

            if (!mission) {
                throw new Error(
                    "Could not create a mission."
                );
            }

            renderMission(mission);
        } catch (error) {
            console.error(error);

            alert(
                "Something went wrong while creating the mission."
            );
        } finally {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }

    function setupChoices() {
        const buttons =
            document.querySelectorAll(
                "#vibeChoices .choice"
            );

        buttons.forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    buttons.forEach((item) => {
                        item.classList.remove("active");
                    });

                    button.classList.add("active");

                    state.vibe =
                        button.dataset.vibe ||
                        "Explore";
                }
            );
        });
    }

    function setupButtons() {
        const createBtn =
            getElement("createBtn");

        const lockBtn =
            getElement("lockBtn");

        const completeBtn =
            getElement("completeBtn");

        const newMissionBtn =
            getElement("newMissionBtn");

        const clearHistoryBtn =
            getElement("clearHistoryBtn");

        if (createBtn) {
            createBtn.addEventListener(
                "click",
                createMission
            );
        }

        if (lockBtn) {
            lockBtn.addEventListener(
                "click",
                startCountdown
            );
        }

        if (completeBtn) {
            completeBtn.addEventListener(
                "click",
                completeMission
            );
        }

        if (newMissionBtn) {
            newMissionBtn.addEventListener(
                "click",
                () => {
                    const missionSection =
                        getElement("missionSection");

                    if (missionSection) {
                        missionSection.classList.add(
                            "hidden"
                        );
                    }

                    resetCountdown();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            );
        }

        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener(
                "click",
                () => {
                    const confirmed =
                        window.confirm(
                            "Clear all mission history?"
                        );

                    if (!confirmed) {
                        return;
                    }

                    state.history = [];

                    saveHistory();
                    renderHistory();
                }
            );
        }
    }

    function init() {
        loadHistory();
        renderHistory();
        setupChoices();
        setupButtons();

        console.log(
            "GO. initialized successfully."
        );
    }

    init();
});