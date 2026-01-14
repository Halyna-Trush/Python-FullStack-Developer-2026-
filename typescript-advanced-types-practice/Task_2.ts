// https://www.typescriptlang.org/play/?#code/
// 1) Enums
enum Days {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

function getActivity(day: Days): string {
  switch (day) {
    case Days.Monday:
      return "10 squats";
    case Days.Tuesday:
      return "10 push-ups";
    case Days.Wednesday:
      return "20 jumping jacks";
    case Days.Thursday:
      return "30 seconds plank";
    case Days.Friday:
      return "15 squats";
    case Days.Saturday:
      return "20-minute walk";
    case Days.Sunday:
      return "Light stretching for 5 minutes";
  }
}

// ===== control =====
const testDays: Days[] = Object.values(Days);

for (const day of testDays) {
  console.log(day, "→", getActivity(day));
}
/*
// 1) Union
type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

function getActivity(day: Days): string {
  switch (day) {
    case "Monday":
      return "10 squats";
    case "Tuesday":
      return "10 push-ups";
    case "Wednesday":
      return "20 jumping jacks";
    case "Thursday":
      return "30 seconds plank";
    case "Friday":
      return "15 squats";
    case "Saturday":
      return "20-minute walk";
    case "Sunday":
      return "Light stretching for 5 minutes";
  }
}

// ===== control =====
const testDays: Days[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

for (const day of testDays) {
  console.log(day, "→", getActivity(day));
}
*/
// 2) Generics: Queue<T>
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T {
    if (this.items.length === 0) {
      throw new Error("Queue is empty");
    }

    return this.items.shift()!;
  }
}

// ===== control =====
const stringQueue = new Queue<string>();
stringQueue.enqueue("tomato");
stringQueue.enqueue("cucumber");
stringQueue.enqueue("potatoes");
stringQueue.enqueue("carrots");

console.log(stringQueue.dequeue());
console.log(stringQueue.dequeue());

const numberQueue = new Queue<number>();
numberQueue.enqueue(100);
numberQueue.enqueue(30);

console.log(numberQueue.dequeue());
console.log(numberQueue.dequeue());
console.log(numberQueue.dequeue());

// 3) Type alias + Literal types
type StringOrNumber = string | number;

function combine(
  input1: StringOrNumber,
  input2: StringOrNumber
): StringOrNumber {
  if (typeof input1 === "string" && typeof input2 === "string") {
    return input1 + input2;
  }

  if (typeof input1 === "number" && typeof input2 === "number") {
    return input1 + input2;
  }

  throw new Error("Invalid input types");
}

// ===== control =====
console.log(combine("data", "set"));
console.log(combine(7, 3));
console.log(combine("value", 5));


// 4) Interfaces: extend + class implements
interface IPerson {
  name: string;
  age: number;
}

interface IWorker extends IPerson {
  position: string;
  salary: number;
}

class Workers implements IWorker {
  name: string;
  age: number;
  position: string;
  salary: number;

  constructor(name: string, age: number, position: string, salary: number) {
    if (salary <= 0) {
      throw new Error("Salary must be positive");
    }

    this.name = name;
    this.age = age;
    this.position = position;
    this.salary = salary;

    console.log(`Worker created: ${this.name}, ${this.position}, salary ${this.salary}`);
  }

  getSalary(): number {
    return this.salary;
  }

  setSalary(newSalary: number): void {
    if (newSalary <= 0) {
      throw new Error("Salary must be positive");
    }

    const oldSalary = this.salary;
    this.salary = newSalary;

    console.log(`Salary updated for ${this.name}: ${oldSalary} → ${newSalary}`);
  }
}

// ===== control =====
const worker1 = new Workers("Oksana", 29, "Junior QA", 1200);
console.log(worker1.getSalary());
worker1.setSalary(1400);
console.log(worker1.getSalary());

const worker2 = new Workers("Taras", 33, "Middle Dev", -500);
console.log(worker2.getSalary());
