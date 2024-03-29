// deno-lint-ignore-file no-unused-vars
type A = Awaited<Promise<string>> // string

const a: A = 'foo'

type B = Awaited<Promise<Promise<number>>> // string

interface Todo {
  title: string
  description: string
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate }
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
}

const todo2 = updateTodo(todo1, {
  description: 'throw out trash',
})
