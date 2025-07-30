import { css } from "~/styled-system/css";
import { container, center, stack } from "~/styled-system/patterns";

export default function DashboardSkeleton() {
  return (
    <div className={css({ minH: "100vh", bg: "gray.50" })}>
      <header className={css({ py: "6", bg: "gray.100", mb: "8" })}>
        <div className={container({ maxW: "7xl" })}>
          <div
            className={css({
              h: "32px",
              bg: "gray.300",
              borderRadius: "md",
              mb: "4",
              width: "40%",
            })}
          />
        </div>
      </header>
      <main className={css({ py: ["6", "8", "12"], mt: "6" })}>
        <div className={container({ maxW: "7xl" })}>
          <div className={center({ maxW: "6xl", mx: "auto" })}>
            <div className={stack({ gap: ["4", "6", "8"] })}>
              <div className={css({ textAlign: "center" })}>
                <div
                  className={css({
                    h: "28px",
                    bg: "gray.300",
                    borderRadius: "md",
                    mb: "2",
                    width: "30%",
                    mx: "auto",
                  })}
                />
                <div
                  className={css({
                    h: "20px",
                    bg: "gray.200",
                    borderRadius: "md",
                    width: "60%",
                    mx: "auto",
                  })}
                />
              </div>
              <div className={css({ mt: "8" })}>
                {/* Simulate product cards skeleton */}
                <div
                  className={css({
                    display: "flex",
                    gap: "4",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  })}
                >
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={css({
                        w: ["100%", "220px"],
                        h: "160px",
                        bg: "gray.200",
                        borderRadius: "lg",
                        mb: "4",
                        boxShadow: "sm",
                      })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
