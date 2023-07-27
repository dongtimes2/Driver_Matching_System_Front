import { styled } from "styled-components";
import ToggleButton from "../atoms/ToggleButton";

interface Props {
  data: { type: string; name: string }[];
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

function ToggleSelector({ data, selectedItem, setSelectedItem }: Props) {
  const handleButtonClick = (type: string) => {
    setSelectedItem(type);
  };

  return (
    <Wrapper>
      {data.map((item) => (
        <ToggleButton
          key={item.type}
          onClick={() => handleButtonClick(item.type)}
          mode={selectedItem === item.type ? "light" : "dark"}
        >
          {item.name}
        </ToggleButton>
      ))}
    </Wrapper>
  );
}

export default ToggleSelector;
