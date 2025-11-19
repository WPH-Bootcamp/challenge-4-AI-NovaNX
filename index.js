const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

//### `generateUniqueId()`
function generateUniqueId() {
  // Menghasilkan ID unik berbasis timestamp + random base36
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 10);
  return `${ts}-${rnd}`;
}

//### `addTodo()`
function addTodo() {
  const text = prompt("Enter a new to-do: ")?.trim();
  if (!text) {
    console.log("To-do text cannot be empty.");
    return;
  }
  const todo = { id: generateUniqueId(), text, isCompleted: false };
  todos.push(todo);
  console.log(`To-do "${todo.text}" added.`);
}

//### `markTodoCompleted()`
function markTodoCompleted() {
  listTodos();
  if (todos.length === 0) return;
  const input = prompt(
    "Enter the NUMBER of the to-do to mark as completed: "
  )?.trim();
  const num = Number(input);
  if (!Number.isInteger(num) || num < 1 || num > todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }
  const todo = todos[num - 1];
  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" is already completed.`);
    return;
  }
  todo.isCompleted = true;
  console.log(`To-do "${todo.text}" marked as completed.`);
}

//### `deleteTodo()`
function deleteTodo() {
  listTodos();
  if (todos.length === 0) return;
  const input = prompt("Enter the NUMBER of the to-do to delete: ")?.trim();
  const num = Number(input);
  if (!Number.isInteger(num) || num < 1 || num > todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }
  const [removed] = todos.splice(num - 1, 1);
  console.log(`To-do "${removed.text}" deleted.`);
}

//### `listTodos()`
function listTodos() {
  console.log("--- YOUR TO-DO LIST ---");
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }
  todos.forEach((t, i) => {
    console.log(`${i + 1}. [${t.isCompleted ? "DONE" : "ACTIVE"}] | ${t.text}`);
  });
  console.log("");
}

//### `runTodoApp()`
function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    console.log("\n--- TO-DO MENU ---");
    console.log("1. add");
    console.log("2. complete");
    console.log("3. delete");
    console.log("4. list");
    console.log("5. exit");

    const raw = prompt("Enter a command: ");
    const command = raw.trim().toLowerCase();
    switch (command) {
      case "1":
      case "add":
        addTodo();
        break;
      case "2":
      case "complete":
        markTodoCompleted();
        break;
      case "3":
      case "delete":
        deleteTodo();
        break;
      case "4":
      case "list":
        listTodos();
        break;
      case "5":
      case "exit":
        console.log("Exiting... Bye!");
        running = false; // hentikan loop untuk lingkungan test
        process.exit(0);
        break;
      default:
        console.log("Invalid command. Please choose a valid option.");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
