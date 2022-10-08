import {
  Column,
  MapArea,
  Project,
  ProjectLink,
  ProjectName,
  ProjectWrapper,
  Row
} from "./ProjectList.style";

interface ItemProps {
  id: string;
  title: string;
}

interface ProjectListProps {
  items: ItemProps[];
}


export const ProjectList = (props: ProjectListProps) => {
  const { items } = props;

  const reshape = (arr: any, rows: number, cols: number) => {
    const result = new Array(rows);
    for (let row = 0; row < rows; row++) {
      result[row] = new Array(cols);
    }
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result[row][col] = arr[row * cols + col];
      }
    }
    return result;
  };

  const table = reshape(items, Math.ceil(items.length / 4), 4);

  console.log(JSON.stringify(table));

  return (
    <ProjectWrapper>
      {table.map((row) =>
        <Row>
          {row.map((col: any) =>
            col ?
              <Column>
                <ProjectLink to={`/${col.id}/planner`}>
                  <Project>
                    <MapArea></MapArea>
                    <ProjectName>
                      {col.title}
                    </ProjectName>
                  </Project>
                </ProjectLink>
              </Column>
              :
              <Column />
          )}
        </Row>
      )}
    </ProjectWrapper>
  );
};