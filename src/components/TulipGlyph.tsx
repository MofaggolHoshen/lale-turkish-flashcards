import { C } from "../styles/theme";

export function TulipGlyph({ level = 0, size = 44 }) {
  const progress = level / 5;
  const petal =
    level === 0
      ? "#9FB0AC"
      : level < 3
        ? C.turquoise
        : level < 5
          ? C.coral
          : C.gold;
  const beads = new Array(5).fill(0).map((_, index) => index < level);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{ overflow: "visible" }}
    >
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke={C.line}
        strokeWidth="1.5"
      />
      {beads.map((filled, index) => {
        const angle = -90 + index * 72;
        const radians = (angle * Math.PI) / 180;
        return (
          <circle
            key={index}
            cx={32 + 29 * Math.cos(radians)}
            cy={32 + 29 * Math.sin(radians)}
            r="3.4"
            fill={filled ? C.cobalt : "#fff"}
            stroke={C.line}
            strokeWidth="1"
          />
        );
      })}
      <path
        d="M32 46 C 32 38, 32 34, 32 30"
        stroke="#5C8A72"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <g transform={`translate(32,26) scale(${0.72 + progress * 0.34})`}>
        <path
          d="M0,10 C -9,4 -10,-9 -3,-14 C -1,-10 0,-6 0,-2 C 0,-6 1,-10 3,-14 C 10,-9 9,4 0,10 Z"
          fill={petal}
        />
        <path
          d="M0,10 C -5,3 -6,-6 -2,-11 C -1,-7 0,-3 0,1 Z"
          fill={petal}
          opacity="0.55"
        />
        <path
          d="M0,10 C 5,3 6,-6 2,-11 C 1,-7 0,-3 0,1 Z"
          fill={petal}
          opacity="0.35"
        />
      </g>
    </svg>
  );
}
