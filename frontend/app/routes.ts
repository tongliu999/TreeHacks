import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("my", "routes/my.tsx"),
] satisfies RouteConfig;
