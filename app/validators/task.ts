import vine from '@vinejs/vine'

/**
 * Validates the task's creation action
 */
export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    completed: vine.boolean(),
  })
)

/**
 * Validates the task's update action
 */
export const updateTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    completed: vine.boolean(),
  })
)
