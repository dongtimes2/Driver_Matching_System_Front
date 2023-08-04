import { styled } from "styled-components";
import ToggleButton from "../atoms/ToggleButton";

interface Item {
  type: string;
  name: string;
}

interface Props<T> {
  data: T[];
  selectedItem: T | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<T | null>>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

function ToggleSelector<T extends Item>({
  data,
  selectedItem,
  setSelectedItem,
}: Props<T>) {
  const handleButtonClick = (item: T) => {
    setSelectedItem(item);
  };

  return (
    <Wrapper>
      {data.map((item) => (
        <ToggleButton
          key={item.type}
          onClick={() => handleButtonClick(item)}
          mode={selectedItem?.type === item.type ? "light" : "dark"}
        >
          {item.name}
        </ToggleButton>
      ))}
    </Wrapper>
  );
}

export default ToggleSelector;
