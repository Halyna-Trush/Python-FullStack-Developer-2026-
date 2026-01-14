# 🐍 Python FullStack Developer 2026

## 🧩 TypeScript types practice (Training Task 2)

This repository contains a training task focused on practicing core and advanced TypeScript features.
All functionality is implemented in a single TypeScript file.

---

## 📋 Task Description

### Working with TypeScript: Enums and Union
Create an enum `Days` that contains the days of the week.  
Create a function `getActivity` that takes a day of the week as an argument (using your enum) and returns a recommended activity for that day (for example, `"Rest"` for Sunday).

### Generics
Create a class `Queue<T>` with two methods:  
- `enqueue(item: T)` for adding elements  
- `dequeue(): T` for removing elements  

Test this class by creating queues of strings and numbers.

### Type Aliases and Literal Types
Create a type alias `StringOrNumber` that can be either a string or a number.  
Create a function `combine(input1: StringOrNumber, input2: StringOrNumber)` that combines two values:
- if both values are strings, concatenate them;
- if both values are numbers, add them;
- in other cases, throw an error.

### Advanced Interface Features
Create an interface `IPerson` with the fields `name` and `age`.  
Extend this interface with a new interface `IWorker` by adding the fields `position` and `salary`.  
Create a class `Worker` that implements `IWorker` and add methods for getting and updating the salary.

---

## 📂 Files

- `Task_2.ts` — complete implementation of all tasks in a single TypeScript file
