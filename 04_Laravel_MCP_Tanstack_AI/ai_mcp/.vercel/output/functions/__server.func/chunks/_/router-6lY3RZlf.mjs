import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createRouter, createRootRouteWithContext, createFileRoute, HeadContent, Scripts, Link, useRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { forwardRef, createElement, useState, useEffect, useCallback } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server.mjs";
import { chat, toolDefinition, toServerSentEventsResponse } from "@tanstack/ai";
import { geminiText } from "@tanstack/ai-gemini";
import axios from "axios";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "../../index.mjs";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$f = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$f);
const __iconNode$e = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$e);
const __iconNode$d = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$d);
const __iconNode$c = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$c);
const __iconNode$b = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$b);
const __iconNode$a = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
];
const Network = createLucideIcon("network", __iconNode$a);
const __iconNode$9 = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
];
const Route$d = createLucideIcon("route", __iconNode$9);
const __iconNode$8 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$8);
const __iconNode$7 = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
];
const Server = createLucideIcon("server", __iconNode$7);
const __iconNode$6 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$5);
const __iconNode$4 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3", key: "m1af9g" }],
  ["path", { d: "M9 11.2h5.7", key: "3zgcl2" }]
];
const SquareFunction = createLucideIcon("square-function", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
];
const StickyNote = createLucideIcon("sticky-note", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "knzxuh"
    }
  ],
  [
    "path",
    {
      d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "2jd2cc"
    }
  ],
  [
    "path",
    {
      d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "rd2r6e"
    }
  ]
];
const Waves = createLucideIcon("waves", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function getContext() {
  const queryClient = new QueryClient();
  return {
    queryClient
  };
}
function Provider({
  children,
  queryClient
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
}
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [groupedExpanded, setGroupedExpanded] = useState({});
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "p-4 flex items-center bg-gray-800 text-white shadow-lg", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsOpen(true),
          className: "p-2 hover:bg-gray-700 rounded-lg transition-colors",
          "aria-label": "Open menu",
          children: /* @__PURE__ */ jsx(Menu, { size: 24 })
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "ml-4 text-xl font-semibold", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/tanstack-word-logo-white.svg",
          alt: "TanStack Logo",
          className: "h-10"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-700", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Navigation" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "p-2 hover:bg-gray-800 rounded-lg transition-colors",
                "aria-label": "Close menu",
                children: /* @__PURE__ */ jsx(X, { size: 24 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "flex-1 p-4 overflow-y-auto", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: [
                  /* @__PURE__ */ jsx(House, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Home" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/demo/start/server-funcs",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: [
                  /* @__PURE__ */ jsx(SquareFunction, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Start - Server Functions" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/demo/start/api-request",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: [
                  /* @__PURE__ */ jsx(Network, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Start - API Request" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/demo/start/ssr",
                  onClick: () => setIsOpen(false),
                  className: "flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                  activeProps: {
                    className: "flex-1 flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                  },
                  children: [
                    /* @__PURE__ */ jsx(StickyNote, { size: 20 }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Start - SSR Demos" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "p-2 hover:bg-gray-800 rounded-lg transition-colors",
                  onClick: () => setGroupedExpanded((prev) => ({
                    ...prev,
                    StartSSRDemo: !prev.StartSSRDemo
                  })),
                  children: groupedExpanded.StartSSRDemo ? /* @__PURE__ */ jsx(ChevronDown, { size: 20 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 20 })
                }
              )
            ] }),
            groupedExpanded.StartSSRDemo && /* @__PURE__ */ jsxs("div", { className: "flex flex-col ml-4", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/demo/start/ssr/spa-mode",
                  onClick: () => setIsOpen(false),
                  className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                  activeProps: {
                    className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                  },
                  children: [
                    /* @__PURE__ */ jsx(StickyNote, { size: 20 }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "SPA Mode" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/demo/start/ssr/full-ssr",
                  onClick: () => setIsOpen(false),
                  className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                  activeProps: {
                    className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                  },
                  children: [
                    /* @__PURE__ */ jsx(StickyNote, { size: 20 }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Full SSR" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/demo/start/ssr/data-only",
                  onClick: () => setIsOpen(false),
                  className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                  activeProps: {
                    className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                  },
                  children: [
                    /* @__PURE__ */ jsx(StickyNote, { size: 20 }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Data Only" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/demo/tanstack-query",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: [
                  /* @__PURE__ */ jsx(Network, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "TanStack Query" })
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
const appCss = "/assets/styles-CB3dFuYz.css";
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "TanStack Start Starter"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Header, {}),
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const Route$b = createFileRoute("/")({ component: App });
function App() {
  const features = [
    {
      icon: /* @__PURE__ */ jsx(Zap, { className: "w-12 h-12 text-cyan-400" }),
      title: "Powerful Server Functions",
      description: "Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple."
    },
    {
      icon: /* @__PURE__ */ jsx(Server, { className: "w-12 h-12 text-cyan-400" }),
      title: "Flexible Server Side Rendering",
      description: "Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where."
    },
    {
      icon: /* @__PURE__ */ jsx(Route$d, { className: "w-12 h-12 text-cyan-400" }),
      title: "API Routes",
      description: "Build type-safe API endpoints alongside your application. No separate backend needed."
    },
    {
      icon: /* @__PURE__ */ jsx(Shield, { className: "w-12 h-12 text-cyan-400" }),
      title: "Strongly Typed Everything",
      description: "End-to-end type safety from server to client. Catch errors before they reach production."
    },
    {
      icon: /* @__PURE__ */ jsx(Waves, { className: "w-12 h-12 text-cyan-400" }),
      title: "Full Streaming Support",
      description: "Stream data from server to client progressively. Perfect for AI applications and real-time updates."
    },
    {
      icon: /* @__PURE__ */ jsx(Sparkles, { className: "w-12 h-12 text-cyan-400" }),
      title: "Next Generation Ready",
      description: "Built from the ground up for modern web applications. Deploy anywhere JavaScript runs."
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative py-20 px-6 text-center overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-6 mb-6", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/tanstack-circle-logo.png",
              alt: "TanStack Logo",
              className: "w-24 h-24 md:w-32 md:h-32"
            }
          ),
          /* @__PURE__ */ jsxs("h1", { className: "text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "TANSTACK" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent", children: "START" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl md:text-3xl text-gray-300 mb-4 font-light", children: "The framework for next generation AI applications" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-3xl mx-auto mb-8", children: "Full-stack framework powered by TanStack Router for React and Solid. Build modern applications with server functions, streaming, and type safety." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://tanstack.com/start",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50",
              children: "Documentation"
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm mt-2", children: [
            "Begin your TanStack Start journey by editing",
            " ",
            /* @__PURE__ */ jsx("code", { className: "px-2 py-1 bg-slate-700 rounded text-cyan-400", children: "/src/routes/index.tsx" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 px-6 max-w-7xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10",
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: feature.icon }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-3", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: feature.description })
        ]
      },
      index
    )) }) })
  ] });
}
const Route$a = createFileRoute("/demo/tanstack-query")({
  component: TanStackQueryDemo
});
function TanStackQueryDemo() {
  const { data, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/demo/api/tq-todos").then((res) => res.json()),
    initialData: []
  });
  const { mutate: addTodo2 } = useMutation({
    mutationFn: (todo2) => fetch("/demo/api/tq-todos", {
      method: "POST",
      body: JSON.stringify(todo2)
    }).then((res) => res.json()),
    onSuccess: () => refetch()
  });
  const [todo, setTodo] = useState("");
  const submitTodo = useCallback(async () => {
    await addTodo2(todo);
    setTodo("");
  }, [addTodo2, todo]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-4 text-white",
      style: {
        backgroundImage: "radial-gradient(50% 50% at 80% 20%, #3B021F 0%, #7B1028 60%, #1A000A 100%)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl mb-4", children: "TanStack Query Todos list" }),
        /* @__PURE__ */ jsx("ul", { className: "mb-4 space-y-2", children: data?.map((t) => /* @__PURE__ */ jsx(
          "li",
          {
            className: "bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md",
            children: /* @__PURE__ */ jsx("span", { className: "text-lg text-white", children: t.name })
          },
          t.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: todo,
              onChange: (e) => setTodo(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  submitTodo();
                }
              },
              placeholder: "Enter a new todo...",
              className: "w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              disabled: todo.trim().length === 0,
              onClick: submitTodo,
              className: "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors",
              children: "Add todo"
            }
          )
        ] })
      ] })
    }
  );
}
const Route$9 = createFileRoute("/demo/gemini-chat")({
  component: GeminiChatDemo
});
function GeminiChatDemo() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading, error } = useChat({
    connection: fetchServerSentEvents("/demo/api/chat"),
    onError: (err) => {
      console.error("❌ Error:", err);
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 p-4 shadow-lg", children: /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-white flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent", children: "Gemini Chat" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-gray-400", children: "(Powered by Gemini 2.5 Flash)" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
      messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-400 mt-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Commence une conversation avec Gemini!" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "Pose-moi n'importe quelle question..." })
      ] }),
      messages.map((message) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: `max-w-[80%] rounded-lg p-4 ${message.role === "user" ? "bg-cyan-500 text-white" : "bg-slate-700/50 backdrop-blur-sm text-white border border-slate-600"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase opacity-70", children: message.role === "user" ? "Toi" : "Gemini" }) }),
                message.parts.map((part, idx) => {
                  if (part.type === "text") {
                    return /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "whitespace-pre-wrap wrap-break-word",
                        children: part.content
                      },
                      idx
                    );
                  }
                  if (part.type === "thinking") {
                    return /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "text-sm italic opacity-70 border-l-2 border-cyan-400 pl-2 mt-2",
                        children: [
                          "💭 Réflexion: ",
                          part.content
                        ]
                      },
                      idx
                    );
                  }
                  return null;
                })
              ]
            }
          )
        },
        message.id
      )),
      isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-400", children: [
        /* @__PURE__ */ jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
        /* @__PURE__ */ jsx("span", { children: "Gemini réfléchit..." })
      ] }) }) }),
      error && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "bg-red-900/50 backdrop-blur-sm border border-red-700 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "text-red-200", children: [
        /* @__PURE__ */ jsx("strong", { children: "Erreur:" }),
        " ",
        error.message
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-slate-700 bg-slate-800/80 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: "Écris ton message ici...",
          disabled: isLoading,
          className: "flex-1 px-4 py-3 rounded-lg border border-slate-600 bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: !input.trim() || isLoading,
          className: "px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center gap-2",
          children: isLoading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
        }
      )
    ] }) })
  ] });
}
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getTodos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c9d51a5243700889c80f82ed57a4ce74b25f188e5ebd534c9c64965dc44e8e8d"));
const addTodo = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("34a400ef155cae4517b50b99a6f1db6819e2090dea5a8bc25de22b442e6347a4"));
const Route$8 = createFileRoute("/demo/start/server-funcs")({
  component: Home$1,
  loader: async () => await getTodos()
});
function Home$1() {
  const router = useRouter();
  let todos2 = Route$8.useLoaderData();
  const [todo, setTodo] = useState("");
  const submitTodo = useCallback(async () => {
    todos2 = await addTodo({
      data: todo
    });
    setTodo("");
    router.invalidate();
  }, [addTodo, todo]);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white", style: {
    backgroundImage: "radial-gradient(50% 50% at 20% 60%, #23272a 0%, #18181b 50%, #000000 100%)"
  }, children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl mb-4", children: "Start Server Functions - Todo Example" }),
    /* @__PURE__ */ jsx("ul", { className: "mb-4 space-y-2", children: todos2?.map((t) => /* @__PURE__ */ jsx("li", { className: "bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md", children: /* @__PURE__ */ jsx("span", { className: "text-lg text-white", children: t.name }) }, t.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx("input", { type: "text", value: todo, onChange: (e) => setTodo(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter") {
          submitTodo();
        }
      }, placeholder: "Enter a new todo...", className: "w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" }),
      /* @__PURE__ */ jsx("button", { disabled: todo.trim().length === 0, onClick: submitTodo, className: "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors", children: "Add todo" })
    ] })
  ] }) });
}
function getNames() {
  return fetch("/demo/api/names").then((res) => res.json());
}
const Route$7 = createFileRoute("/demo/start/api-request")({
  component: Home
});
function Home() {
  const { data: names = [] } = useQuery({
    queryKey: ["names"],
    queryFn: getNames
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex items-center justify-center min-h-screen p-4 text-white",
      style: {
        backgroundColor: "#000",
        backgroundImage: "radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl mb-4", children: "Start API Request Demo - Names List" }),
        /* @__PURE__ */ jsx("ul", { className: "mb-4 space-y-2", children: names.map((name) => /* @__PURE__ */ jsx(
          "li",
          {
            className: "bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md",
            children: /* @__PURE__ */ jsx("span", { className: "text-lg text-white", children: name })
          },
          name
        )) })
      ] })
    }
  );
}
const todos = [
  {
    id: 1,
    name: "Buy groceries"
  },
  {
    id: 2,
    name: "Buy mobile phone"
  },
  {
    id: 3,
    name: "Buy laptop"
  }
];
const Route$6 = createFileRoute("/demo/api/tq-todos")({
  server: {
    handlers: {
      GET: () => {
        return Response.json(todos);
      },
      POST: async ({ request }) => {
        const name = await request.json();
        const todo = {
          id: todos.length + 1,
          name
        };
        todos.push(todo);
        return Response.json(todo);
      }
    }
  }
});
const Route$5 = createFileRoute("/demo/api/names")({
  server: {
    handlers: {
      GET: () => Response.json(["Alice", "Bob", "Charlie"])
    }
  }
});
const mcpUserClient = axios.create({
  baseURL: process.env.MCP_USER_URL || "http://localhost:8000/mcp/user",
  timeout: 1e4,
  headers: {
    "Content-Type": "application/json"
  }
});
axios.create({
  timeout: 1e4,
  headers: {
    "Content-Type": "application/json"
  }
});
const inputSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The name of the user"
    },
    email: {
      type: "string",
      description: "The email of the user",
      format: "email"
    }
  },
  required: ["name", "email"]
};
const outputSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "User name"
    },
    email: {
      type: "string",
      description: "User email"
    }
  },
  required: ["name", "email"]
};
const createUserDef = toolDefinition({
  name: "create-user",
  description: "This tool creates a new user with the given name and email address.",
  inputSchema,
  outputSchema
});
const createUser = createUserDef.server(async (args) => {
  const { name, email } = args;
  try {
    const { data: mcpResponse } = await mcpUserClient.post("", {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "create-user",
        arguments: {
          name,
          email
        }
      }
    });
    if (mcpResponse.error) {
      throw new Error(mcpResponse.error.message || "MCP server error");
    }
    const resultText = mcpResponse.result?.content?.[0]?.text || mcpResponse.result;
    let userData;
    if (typeof resultText === "string") {
      try {
        userData = JSON.parse(resultText);
      } catch {
        throw new Error("Invalid JSON response from MCP server");
      }
    } else {
      userData = resultText;
    }
    return {
      name: userData.name,
      email: userData.email
    };
  } catch (error) {
    console.error("Error calling MCP user service:", error);
    return {
      name,
      email
    };
  }
});
const Route$4 = createFileRoute("/demo/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json();
        const stream = chat({
          adapter: geminiText("gemini-2.5-flash"),
          messages,
          tools: [createUser]
        });
        return toServerSentEventsResponse(stream);
      }
    }
  }
});
const Route$3 = createFileRoute("/demo/start/ssr/")({
  component: RouteComponent$3
});
function RouteComponent$3() {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-black p-4 text-white",
      style: {
        backgroundImage: "radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-green-400 bg-clip-text text-transparent", children: "SSR Demos" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/demo/start/ssr/spa-mode",
              className: "text-2xl font-bold py-6 px-8 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white text-center shadow-lg transform transition-all hover:scale-105 hover:shadow-pink-500/50 border-2 border-pink-400",
              children: "SPA Mode"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/demo/start/ssr/full-ssr",
              className: "text-2xl font-bold py-6 px-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-center shadow-lg transform transition-all hover:scale-105 hover:shadow-purple-500/50 border-2 border-purple-400",
              children: "Full SSR"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/demo/start/ssr/data-only",
              className: "text-2xl font-bold py-6 px-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-center shadow-lg transform transition-all hover:scale-105 hover:shadow-green-500/50 border-2 border-green-400",
              children: "Data Only"
            }
          )
        ] })
      ] })
    }
  );
}
const getPunkSongs = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f74da881407a186b78a7af058df21dafb0126eb11e5a4d54fd322e8feb5038f1"));
const Route$2 = createFileRoute("/demo/start/ssr/spa-mode")({
  ssr: false,
  component: RouteComponent$2
});
function RouteComponent$2() {
  const [punkSongs, setPunkSongs] = useState([]);
  useEffect(() => {
    getPunkSongs().then(setPunkSongs);
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white",
      style: {
        backgroundImage: "radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-green-400", children: "SPA Mode - Punk Songs" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: punkSongs.map((song) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm shadow-md",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg text-white font-medium", children: song.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-white/60", children: [
                " - ",
                song.artist
              ] })
            ]
          },
          song.id
        )) })
      ] })
    }
  );
}
const Route$1 = createFileRoute("/demo/start/ssr/full-ssr")({
  component: RouteComponent$1,
  loader: async () => await getPunkSongs()
});
function RouteComponent$1() {
  const punkSongs = Route$1.useLoaderData();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white",
      style: {
        backgroundImage: "radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-purple-400", children: "Full SSR - Punk Songs" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: punkSongs.map((song) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm shadow-md",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg text-white font-medium", children: song.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-white/60", children: [
                " - ",
                song.artist
              ] })
            ]
          },
          song.id
        )) })
      ] })
    }
  );
}
const Route = createFileRoute("/demo/start/ssr/data-only")({
  ssr: "data-only",
  component: RouteComponent,
  loader: async () => await getPunkSongs()
});
function RouteComponent() {
  const punkSongs = Route.useLoaderData();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white",
      style: {
        backgroundImage: "radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-pink-400", children: "Data Only SSR - Punk Songs" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: punkSongs.map((song) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm shadow-md",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg text-white font-medium", children: song.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-white/60", children: [
                " - ",
                song.artist
              ] })
            ]
          },
          song.id
        )) })
      ] })
    }
  );
}
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const DemoTanstackQueryRoute = Route$a.update({
  id: "/demo/tanstack-query",
  path: "/demo/tanstack-query",
  getParentRoute: () => Route$c
});
const DemoGeminiChatRoute = Route$9.update({
  id: "/demo/gemini-chat",
  path: "/demo/gemini-chat",
  getParentRoute: () => Route$c
});
const DemoStartServerFuncsRoute = Route$8.update({
  id: "/demo/start/server-funcs",
  path: "/demo/start/server-funcs",
  getParentRoute: () => Route$c
});
const DemoStartApiRequestRoute = Route$7.update({
  id: "/demo/start/api-request",
  path: "/demo/start/api-request",
  getParentRoute: () => Route$c
});
const DemoApiTqTodosRoute = Route$6.update({
  id: "/demo/api/tq-todos",
  path: "/demo/api/tq-todos",
  getParentRoute: () => Route$c
});
const DemoApiNamesRoute = Route$5.update({
  id: "/demo/api/names",
  path: "/demo/api/names",
  getParentRoute: () => Route$c
});
const DemoApiChatRoute = Route$4.update({
  id: "/demo/api/chat",
  path: "/demo/api/chat",
  getParentRoute: () => Route$c
});
const DemoStartSsrIndexRoute = Route$3.update({
  id: "/demo/start/ssr/",
  path: "/demo/start/ssr/",
  getParentRoute: () => Route$c
});
const DemoStartSsrSpaModeRoute = Route$2.update({
  id: "/demo/start/ssr/spa-mode",
  path: "/demo/start/ssr/spa-mode",
  getParentRoute: () => Route$c
});
const DemoStartSsrFullSsrRoute = Route$1.update({
  id: "/demo/start/ssr/full-ssr",
  path: "/demo/start/ssr/full-ssr",
  getParentRoute: () => Route$c
});
const DemoStartSsrDataOnlyRoute = Route.update({
  id: "/demo/start/ssr/data-only",
  path: "/demo/start/ssr/data-only",
  getParentRoute: () => Route$c
});
const rootRouteChildren = {
  IndexRoute,
  DemoGeminiChatRoute,
  DemoTanstackQueryRoute,
  DemoApiChatRoute,
  DemoApiNamesRoute,
  DemoApiTqTodosRoute,
  DemoStartApiRequestRoute,
  DemoStartServerFuncsRoute,
  DemoStartSsrDataOnlyRoute,
  DemoStartSsrFullSsrRoute,
  DemoStartSsrSpaModeRoute,
  DemoStartSsrIndexRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const rqContext = getContext();
  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props) => {
      return /* @__PURE__ */ jsx(Provider, { ...rqContext, children: props.children });
    }
  });
  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient });
  return router;
};
export {
  getRouter
};
