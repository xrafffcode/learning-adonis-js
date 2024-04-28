import type { HttpContext } from '@adonisjs/core/http'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

import Task from '#models/task'

export default class TasksController {
  async index({ response }: HttpContext) {
    const tasks = await Task.all()

    return response.json({
      success: true,
      data: tasks,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = await request.all()

    const payload = await createTaskValidator.validate(data)

    const task = new Task()

    task.title = payload.title
    task.completed = payload.completed

    await task.save()

    return response.json({
      success: true,
      message: 'Task created successfully',
      data: task,
    })
  }

  async show({ params, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    return response.json({
      success: true,
      data: task,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    const payload = await updateTaskValidator.validate(request.all())

    task.title = payload.title
    task.completed = payload.completed

    await task.save()

    return response.json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    await task.delete()

    return response.json({
      success: true,
      message: 'Task deleted successfully',
    })
  }
}
