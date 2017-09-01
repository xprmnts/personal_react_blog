/******************* AUTHENTICATION ACTION TYPES ****************************/
export const AUTH_USER = "auth_user";
export const UNAUTH_USER = "unauth_user";
export const AUTH_ERROR = "auth_error";

/*********************** LIST STATE ACTION TYPES ****************************/
export const GET_LIST = "get_list";
export const LIST_ERROR = "list_error";

/*********************** EDITOR STATE ACTION TYPES ****************************/
export const INIT_EDITOR_STATE = "init_editor_state";
export const GET_EDITOR_STATE = "get_editor_state";
export const UPDATE_EDITOR_STATE = "update_editor_state"; // need for rendering
export const SAVE_EDITOR_STATE = "save_editor_state"; // need for auto save
export const EDITOR_ERROR = "editor_error";

/*********************** POST STATE ACTION TYPES *****************************/
export const CREATE_POST_NEW = "create_post_new"; // use for just meta updates
export const UPDATE_POST_META = "update_post_meta"; // use for just meta updates
export const UPDATE_POST_OBJECT = "update_post_object"; // use for publishing or meta+editor updates
export const GET_POST_VIEWABLE = "get_post_viewable";
export const GET_POST_PREVIEW = "get_post_preview";
export const POST_ERROR = "post_error";
