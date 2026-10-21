import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

/**
 * EPSTAR's content model.  Text is stored per language so that publishing a
 * French edit never overwrites Arabic or English content.  Media values are
 * R2 object keys, never public URLs, which keeps storage portable if hosting
 * changes later.
 */
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["admin", "editor"] }).notNull().default("editor"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [uniqueIndex("users_email_unique").on(table.email)]);

export const authTokens = sqliteTable("auth_tokens", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: text("expires_at").notNull(),
  usedAt: text("used_at"),
  createdAt: text("created_at").notNull(),
}, (table) => [uniqueIndex("auth_tokens_hash_unique").on(table.tokenHash), index("auth_tokens_user_index").on(table.userId)]);

export const adminSessions = sqliteTable("admin_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [uniqueIndex("admin_sessions_hash_unique").on(table.tokenHash), index("admin_sessions_user_index").on(table.userId)]);

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  parentId: text("parent_id"),
  slug: text("slug").notNull(),
  titleFr: text("title_fr").notNull(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionFr: text("description_fr").notNull().default(""),
  descriptionAr: text("description_ar").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  imageKey: text("image_key"),
  sortOrder: integer("sort_order").notNull().default(0),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  uniqueIndex("categories_slug_unique").on(table.slug),
  index("categories_parent_order_index").on(table.parentId, table.sortOrder),
]);

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").references(() => categories.id),
  slug: text("slug").notNull(),
  reference: text("reference").notNull(),
  nameFr: text("name_fr").notNull(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionFr: text("description_fr").notNull().default(""),
  descriptionAr: text("description_ar").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  dimensions: text("dimensions").notNull().default(""),
  finishes: text("finishes").notNull().default("[]"),
  materials: text("materials").notNull().default("[]"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  featuredOrder: integer("featured_order").notNull().default(0),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  uniqueIndex("products_slug_unique").on(table.slug),
  uniqueIndex("products_reference_unique").on(table.reference),
  index("products_category_visible_index").on(table.categoryId, table.isVisible),
  index("products_featured_index").on(table.isFeatured, table.featuredOrder),
]);

export const productImages = sqliteTable("product_images", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  objectKey: text("object_key").notNull(),
  altFr: text("alt_fr").notNull().default(""),
  altAr: text("alt_ar").notNull().default(""),
  altEn: text("alt_en").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull(),
}, (table) => [index("product_images_product_order_index").on(table.productId, table.sortOrder)]);

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").references(() => categories.id),
  slug: text("slug").notNull(),
  titleFr: text("title_fr").notNull(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  summaryFr: text("summary_fr").notNull().default(""),
  summaryAr: text("summary_ar").notNull().default(""),
  summaryEn: text("summary_en").notNull().default(""),
  location: text("location").notNull().default(""),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  featuredOrder: integer("featured_order").notNull().default(0),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  uniqueIndex("projects_slug_unique").on(table.slug),
  index("projects_category_visible_index").on(table.categoryId, table.isVisible),
]);

export const projectImages = sqliteTable("project_images", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  objectKey: text("object_key").notNull(),
  kind: text("kind", { enum: ["before", "after", "gallery"] }).notNull().default("gallery"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull(),
}, (table) => [index("project_images_project_order_index").on(table.projectId, table.sortOrder)]);

export const clientLogos = sqliteTable("client_logos", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  objectKey: text("object_key").notNull(),
  website: text("website"),
  sortOrder: integer("sort_order").notNull().default(0),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const quoteRequests = sqliteTable("quote_requests", {
  id: text("id").primaryKey(),
  requestNumber: text("request_number").notNull(),
  status: text("status", { enum: ["new", "contacted", "in_progress", "won", "lost", "archived"] }).notNull().default("new"),
  language: text("language", { enum: ["fr", "ar", "en"] }).notNull().default("fr"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  companyName: text("company_name").notNull().default(""),
  jobTitle: text("job_title").notNull().default(""),
  projectType: text("project_type").notNull(),
  wilaya: text("wilaya").notNull(),
  communeAddress: text("commune_address").notNull().default(""),
  installationRequired: integer("installation_required", { mode: "boolean" }).notNull().default(false),
  deliveryTimeline: text("delivery_timeline", { enum: ["immediate", "within_15_days", "one_to_three_months"] }),
  budgetRange: text("budget_range"),
  customBudget: text("custom_budget").notNull().default(""),
  message: text("message").notNull().default(""),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  uniqueIndex("quote_requests_number_unique").on(table.requestNumber),
  index("quote_requests_status_date_index").on(table.status, table.createdAt),
]);

export const quoteRequestItems = sqliteTable("quote_request_items", {
  id: text("id").primaryKey(),
  quoteRequestId: text("quote_request_id").notNull().references(() => quoteRequests.id, { onDelete: "cascade" }),
  productId: text("product_id").references(() => products.id),
  productName: text("product_name").notNull(),
  productReference: text("product_reference").notNull().default(""),
  thumbnailKey: text("thumbnail_key").notNull().default(""),
  dimensions: text("dimensions").notNull().default(""),
  finish: text("finish").notNull().default(""),
  quantity: integer("quantity").notNull().default(1),
});

export const quoteAttachments = sqliteTable("quote_attachments", {
  id: text("id").primaryKey(),
  quoteRequestId: text("quote_request_id").notNull().references(() => quoteRequests.id, { onDelete: "cascade" }),
  objectKey: text("object_key").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [index("quote_attachments_request_index").on(table.quoteRequestId)]);
