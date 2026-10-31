import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

// Change this value when you want to feature a different occasion.
const activeOccasion = "diwali"; // "diwali" | "karwa-chauth" | null

const occasions = {
  diwali: {
    label: "HAPPY DIWALI",
    message: "Diwali ki roshni, har kadam ke saath",
    action: "Great Indian Festive Sale",
    href: "/products",
    theme: "from-[#24110d] via-[#632513] to-[#a34818]",
    accent: "text-amber-50",
    emoji: "🪔",
  },
  "karwa-chauth": {
    label: "KARWA CHAUTH",
    message: "Celebrate the occasion in a style of your own",
    action: "Find your festive pair",
    href: "/products",
    theme: "from-[#4a1725] via-[#8a2d3d] to-[#bd7254]",
    accent: "text-rose-100",
    emoji: "✧",
  },
};

function OccasionBar() {
  const [dismissed, setDismissed] = useState(false);
  const occasion = occasions[activeOccasion];

  if (!occasion || dismissed) return null;

  return (
    <aside
      className={`occasion-bar relative isolate overflow-hidden bg-gradient-to-r ${occasion.theme} ${occasion.accent}`}
    >
      {activeOccasion === "diwali" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="fairy-lights">
            {Array.from({ length: 22 }, (_, index) => (
              <span key={index} className="fairy-bulb" style={{ "--bulb-index": index }} />
            ))}
          </div>
          <span className="diwali-firework diwali-firework-one">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="diwali-firework diwali-firework-two">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="diwali-firework diwali-firework-three">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="diya diya-left">
            <i />
          </span>
          <span className="diya diya-right">
            <i />
          </span>
          <span className="diwali-glow" />
        </div>
      )}
      <div className="occasion-bar-content relative z-10 mx-auto flex min-h-12 w-11/12 max-w-[1480px] flex-wrap items-center justify-center gap-x-3 gap-y-1 pb-4 pt-2 pr-8 text-center text-[12px] sm:text-[13px]">
        <span aria-hidden="true" className="diya-emoji">
          {occasion.emoji}
        </span>
        <span className="font-extrabold tracking-[0.12em]">
          {occasion.label}
        </span>
        <span className="hidden h-4 w-px bg-white/35 sm:block" />
        <span className="font-medium text-white/95">{occasion.message}</span>
        <Link
          to={occasion.href}
          className="inline-flex items-center gap-1 rounded-full border border-amber-100/45 bg-amber-100/10 px-3 py-1 font-bold text-amber-50 shadow-[0_0_18px_rgba(255,184,70,0.2)] transition hover:bg-amber-100/20"
        >
          {occasion.action}
          <IoIosArrowForward aria-hidden="true" />
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss occasion announcement"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded p-1 text-white/75 transition hover:bg-white/10 hover:text-white"
      >
        ×
      </button>
      {activeOccasion === "diwali" && (
        <style>{`
        .occasion-bar { background-size: 200% 200%; animation: diwali-drift 9s ease-in-out infinite alternate; }
        .occasion-bar::after { content:""; position:absolute; inset:0; pointer-events:none; opacity:.28; background-image:radial-gradient(#ffd98a 1px,transparent 1px); background-size:29px 25px; mask-image:linear-gradient(90deg,black,transparent 42%,transparent 58%,black); }
        .diwali-glow { position:absolute; width:38rem; height:5rem; left:50%; top:50%; transform:translate(-50%,-50%); background:#ffb13b; opacity:.13; filter:blur(38px); }
        .diya { position:absolute; bottom:5px; width:27px; height:12px; border-radius:4px 4px 16px 16px; background:linear-gradient(#ffcb60,#a63d13); box-shadow:0 0 18px #ff9a31; }
        .diya::before { content:""; position:absolute; width:7px; height:13px; left:10px; bottom:10px; border-radius:100% 0 100% 0; transform:rotate(-45deg); background:radial-gradient(ellipse at 65% 70%,#fff8bc 0 15%,#ffcf54 42%,#ff682c 75%); transform-origin:bottom; animation:diya-flame .7s ease-in-out infinite alternate; filter:drop-shadow(0 0 5px #ffad3d); }
        .diya-left { left:5%; }.diya-right { right:5%; }
        .fairy-lights { position:absolute;z-index:2;left:0;right:0;bottom:-2px;height:21px;border-bottom:1px solid rgba(255,220,145,.58);border-radius:0 0 50% 50% / 0 0 100% 100%;filter:drop-shadow(0 3px 5px rgba(255,174,60,.65)) }
        .fairy-bulb { position:absolute;bottom:2px;left:calc((var(--bulb-index) * 4.76%) + 1%);width:6px;height:8px;border-radius:2px 2px 50% 50%;background:#ffe6a0;box-shadow:0 0 7px 3px rgba(255,205,91,.95),0 3px 17px 7px rgba(255,156,45,.48);animation:bulb-twinkle 1.8s ease-in-out infinite alternate }
        @keyframes bulb-twinkle { from { opacity:.5;filter:brightness(.8) } to { opacity:1;filter:brightness(1.5) } }
        .diwali-firework { position:absolute; top:50%; left:18%; width:4px; height:4px; animation:firework 2.8s ease-out infinite; }
        .diwali-firework-two { left:79%; top:45%; animation-delay:.9s; transform:scale(.72); }
        .diwali-firework-three { left:88%; top:58%; animation-delay:1.7s; transform:scale(.5); }
        .diwali-firework i { position:absolute; left:0; top:0; width:3px; height:3px; border-radius:50%; background:#ffe7a0; box-shadow:0 0 7px 2px #ffb642; animation:firework-spark 2.8s ease-out infinite; }
        .diwali-firework i:nth-child(1){--dx:0px;--dy:-27px}.diwali-firework i:nth-child(2){--dx:19px;--dy:-19px}.diwali-firework i:nth-child(3){--dx:27px;--dy:0px}.diwali-firework i:nth-child(4){--dx:19px;--dy:19px}.diwali-firework i:nth-child(5){--dx:0px;--dy:27px}.diwali-firework i:nth-child(6){--dx:-19px;--dy:19px}.diwali-firework i:nth-child(7){--dx:-27px;--dy:0px}.diwali-firework i:nth-child(8){--dx:-19px;--dy:-19px}
        .diwali-firework-two i { animation-delay:.9s }.diwali-firework-three i { animation-delay:1.7s }
        .diwali-firework-two i:nth-child(1),.diwali-firework-three i:nth-child(1){--dx:0px;--dy:-27px}.diwali-firework-two i:nth-child(2),.diwali-firework-three i:nth-child(2){--dx:19px;--dy:-19px}.diwali-firework-two i:nth-child(3),.diwali-firework-three i:nth-child(3){--dx:27px;--dy:0px}.diwali-firework-two i:nth-child(4),.diwali-firework-three i:nth-child(4){--dx:19px;--dy:19px}.diwali-firework-two i:nth-child(5),.diwali-firework-three i:nth-child(5){--dx:0px;--dy:27px}.diwali-firework-two i:nth-child(6),.diwali-firework-three i:nth-child(6){--dx:-19px;--dy:19px}.diwali-firework-two i:nth-child(7),.diwali-firework-three i:nth-child(7){--dx:-27px;--dy:0px}.diwali-firework-two i:nth-child(8),.diwali-firework-three i:nth-child(8){--dx:-19px;--dy:-19px}
        @keyframes firework-spark { 0%,12% { transform:translate(0,0) scale(.2); opacity:0 } 20% { opacity:1 } 65% { transform:translate(var(--dx),var(--dy)) scale(1); opacity:1 } 100% { transform:translate(calc(var(--dx)*1.25),calc(var(--dy)*1.25)) scale(.1); opacity:0 } }
        @keyframes diya-flame { from { transform:rotate(-8deg) scale(.85,.95) } to { transform:rotate(8deg) scale(1.05,1.08) } }
        @keyframes diwali-drift { from { background-position:0% 50% } to { background-position:100% 50% } }
        @media (prefers-reduced-motion: reduce) { .occasion-bar,.diya::before,.diwali-firework i,.fairy-bulb { animation:none !important } }
        @media (max-width:640px) { .diya-left { left:3px }.diya-right { right:3px }.occasion-bar-content { padding-left:25px;padding-right:25px } }
      `}</style>
      )}
    </aside>
  );
}

export default OccasionBar;
