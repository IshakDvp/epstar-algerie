import {AsyncLocalStorage} from "node:async_hooks";
import type {PublicContentData} from "../app/components/use-content";
// Shared across Vinext's RSC/SSR environments, isolated for concurrent requests.
const key=Symbol.for("epstar.public-content-context");
const shared=globalThis as any;
export const publicContentContext:AsyncLocalStorage<PublicContentData>=shared[key]??=new AsyncLocalStorage<PublicContentData>();
