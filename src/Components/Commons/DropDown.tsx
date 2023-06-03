import React from 'react';
import styled from 'styled-components';

type Props = {
  list: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  style?: {
    width?: string;
    height?: string;
    backgroundColor?: string;
  };
};
interface DropdownItemProps {
  picked: boolean;
}

// 드롭다운 커스터마이징 컴포넌트. style 속성 전달 시 적용 가능함.
function DropDown(props: Props) {
  const [click, setClick] = React.useState(false); // 드롭다운 on/off 여부를 판단하는 상태
  const selected = props.selected;
  const setSelected = props.setSelected;
  //   const [selected, setSelected] = React.useState(''); // 선택된 값을 판단하는 상태

  // 드롭다운 영역 밖을 클릭하면 드롭다운이 닫히도록 하는 부분 //
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setClick(false);
    }
  };

  // 받아온 드롭다운 배열을 객체로 변환하는 부분
  const list = props.list.reduce(
    (acc: Record<string, string>, val: string, index: number) => {
      acc[index] = val;
      return acc;
    },
    {}
  );

  return (
    <DropdownWrapper ref={dropdownRef} style={props.style}>
      <DropdownButton
        onClick={() => {
          setClick(!click);
        }}
      >
        {selected.length > 0 ? selected : list[0]}
      </DropdownButton>
      {click && (
        <DropdownMenu>
          {Object.keys(list).map((key: string) => (
            <DropdownItem
              picked={list[key] === selected}
              key={key}
              onClick={() => {
                setSelected(list[key]);
                setClick(false);
              }}
            >
              {list[key]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
}

export default DropDown;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #fff;
  color: #333;
  padding: 10px 15px;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.button<DropdownItemProps>`
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  width: 100%;
  color: #333;
  border: none;
  background: none;
  cursor: pointer;
  background-color: ${(props) => (props.picked ? '#38d411' : '#fff')};
  &:hover {
    background-color: #96df84;
  }
`;
