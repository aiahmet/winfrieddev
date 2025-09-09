import { exercises } from "./app/exercises-data";

console.log("Testing exercise validation functions...\n");

exercises.forEach((exercise) => {
  console.log(`Exercise ${exercise.id}: ${exercise.title}`);
  const isValid = exercise.validation(exercise.solution);
  console.log(`  Solution valid: ${isValid}`);
  
  if (!isValid) {
    console.log(`  ERROR: Exercise ${exercise.id} solution failed validation!`);
  }
  
  console.log(`  Initial code valid: ${exercise.validation(exercise.initialCode)}`);
  console.log("");
});

console.log("Exercise validation testing complete.");