import type { ReactNode } from "react";

import { C } from "../../styles/theme";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 14,
        flexWrap: "wrap",
      }}
    >
      <div>
        <div className="lale-display" style={{ fontSize: 22, fontWeight: 600 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ color: C.inkSoft, fontSize: 13.5, marginTop: 4 }}>{subtitle}</div>
        )}
      </div>
      {action}
    </div>
  );
}
