import { StaggeredItem } from "@/components/common/StaggeredItem";
import AnimatedWordCycle from "@/components/home/animated-word-cycle";
//import { ComponentShowcase } from '../components/home/showcase'
import { Feature } from "@/components/home/feature";
import { ComponentShowcase } from "@/components/home/showcase/index";
import { Button } from "@/components/ui/button";
import { css } from "@styled-system/css";
import { Box, Grid, HStack, VStack } from "@styled-system/jsx";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <Box
        className={css({
          background: "none",
          position: "relative",
          pt: "{sizes.header.height}",
          zIndex: 0,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "2px",
            background: `radial-gradient(at 42% 71%, hsla(352,70%,66%,1) 0px, transparent 50%),
radial-gradient(at 61% 44%, hsla(66,75%,64%,1) 0px, transparent 50%),
radial-gradient(at 21% 10%, hsla(179,89%,78%,1) 0px, transparent 50%),
radial-gradient(at 4% 84%, hsla(52,95%,63%,1) 0px, transparent 50%),
radial-gradient(at 64% 39%, hsla(57,81%,63%,1) 0px, transparent 50%),
radial-gradient(at 13% 29%, hsla(36,70%,72%,1) 0px, transparent 50%),
radial-gradient(at 70% 72%, hsla(67,69%,75%,1) 0px, transparent 50%), url(/noise.svg)`,
            maskImage:
              "radial-gradient(circle at 75% 25%, black 10%, transparent 40%) ",
            WebkitTextFillColor: "transparent",

            zIndex: -1,
          },
        })}
      >
        <Box
          maxW={{ base: "100%", md: "6xl" }}
          mx="auto"
          py="layout.section.lg"
          px="layout.internal.md"
        >
          <VStack mb="layout.section.lg" css={{ textAlign: "center" }}>
            <StaggeredItem delay={0}>
              <h1
                className={css({
                  fontSize: { base: "3xl", md: "4xl" },
                  px: { base: 12, md: 0 },
                  fontWeight: "extrabold",
                  mb: "gap.component.md",
                  lineHeight: "1.5",
                  color: "transparent",
                  background:
                    "linear-gradient(180deg,#ffffff4a,#fff0 41.43%),#272727",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.05em",
                })}
              >
                <span
                  className={css({
                    fontSize: { base: "4xl", md: "8xl" },
                    px: { base: 10, md: 0 },
                    fontWeight: "extrabold",
                    mb: "gap.component.md",
                    lineHeight: "1.5",
                    background:
                      "linear-gradient(180deg,#ffffff4a,#fff0 60.43%),#272727",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  })}
                >
                  Pallas UI
                </span>
                <br /> <AnimatedWordCycle /> React Component Library
              </h1>
            </StaggeredItem>
            <StaggeredItem delay={100}>
              <p
                className={css({
                  fontSize: { base: "lg", md: "xl" },
                  maxWidth: "2xl",
                  marginX: "auto",
                  color: "text.secondary",
                })}
              >
                Beautiful, accessible components built with React and Panda CSS
              </p>
            </StaggeredItem>
            <StaggeredItem delay={200}>
              <HStack
                gap="gap.inline.md"
                justify="center"
                mt="layout.internal.lg"
              >
                <Link href="/docs/introduction">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link href="/docs/components/accordion">
                  <Button
                    variant="outlined"
                    size="lg"
                    className={css({
                      borderColor: "border",
                      color: "text.secondary",
                      bg: "surface.elevated",
                      _hover: {
                        color: "text",
                      },
                    })}
                  >
                    Components
                  </Button>
                </Link>
              </HStack>
            </StaggeredItem>
          </VStack>

          <Grid
            className={css({
              gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" },
              gap: "gap.component.md",
            })}
          >
            {[
              {
                title: "Accessible",
                description:
                  "All components follow WAI-ARIA guidelines and have proper keyboard navigation support.",
              },
              {
                title: "Themeable",
                description:
                  "Easily customize the look and feel of your components with a powerful theming system.",
              },
              {
                title: "Developer Experience",
                description:
                  "Built with TypeScript for a great developer experience with full type safety.",
              },
            ].map((feature, i) => (
              <StaggeredItem key={feature.title} delay={300 + i * 100}>
                <Feature {...feature} />
              </StaggeredItem>
            ))}
          </Grid>
        </Box>
      </Box>
      <StaggeredItem delay={700}>
        <ComponentShowcase />
      </StaggeredItem>
    </Box>
  );
}
