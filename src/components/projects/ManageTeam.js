import React from 'react';
import AddCircle from "material-ui/svg-icons/content/add-circle-outline";
import RemoveCircle from "material-ui/svg-icons/content/remove-circle-outline";

let addRef = null;

export default ({ people, onAdd, onRemove }) => (
  <div className="person">
    <div className="person-flex">
      <input type="text" ref={n => (addRef = n)} />
      <div className="add-person" onClick={() => onAdd(addRef.value)}>
        <AddCircle color={"#3cb371"} />
      </div>
    </div>
    <div>
      {people &&
        people.map(person => (
          <div className="person-flex personlist">
            <span>{person}</span>
            <div className="remove-person" onClick={() => onRemove(person)}>
              <RemoveCircle color={"#cd5c5c"} />
            </div>
          </div>
        ))}
    </div>
  </div>
);
