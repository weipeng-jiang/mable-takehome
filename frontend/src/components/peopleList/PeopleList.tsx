import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableStyle,
} from "@hello-pangea/dnd";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { People } from "./types";

import "./PeopleList.css";

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggableStyle) => {
  if (!draggableStyle) return {};

  return {
    padding: "8px",
    margin: `0 0 8px 0`,
    border: "1px solid #ccc",
    borderRadius: "4px",

    // change background color if dragging
    background: isDragging ? "lightgreen" : "",

    // styles we need to apply on draggable
    ...draggableStyle,
  };
};

type PeopleListProps = {
  peopleData?: People;
  loading?: boolean;
  error?: string;
};

const PeopleList = ({ peopleData, loading, error }: PeopleListProps) => {
  const [people, setPeople] = useState(peopleData || []);

  useEffect(() => {
    setPeople(peopleData || []);
  }, [peopleData]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedPeople = Array.from(people);
    const [reorderedItem] = reorderedPeople.splice(result.source.index, 1);
    reorderedPeople.splice(result.destination.index, 0, reorderedItem);

    setPeople(reorderedPeople);
  };

  return (
    <div className="container">
      <Typography variant="h4">People List</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {(loading && <CircularProgress />) || (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="people">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {people.map(({ id, name, age, location }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          ),
                        }}
                        role="listitem"
                      >
                        <ListItemText
                          primary={`${name || "Unknown"}`}
                          secondary={`Age: ${age ?? "Unknown"}, Location: ${
                            location || "Unknown"
                          }`}
                        />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default PeopleList;
