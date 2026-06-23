import type { Person } from "@/content/team";

import { PersonCard } from "./person-card";

export function PeopleGrid({ people }: { people: readonly Person[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <li key={person.name} className="h-full">
          <PersonCard person={person} />
        </li>
      ))}
    </ul>
  );
}
