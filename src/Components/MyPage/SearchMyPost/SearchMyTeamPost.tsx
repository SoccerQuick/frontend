import react, { useState, useEffect } from 'react';
import MyPostTable from './MyPostTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';

export type GroupPost = {
  leader_name: string;
  title: string;
  location: string;
  status: string;
  gk_count: number;
  player_count: number;
  gk_current_count: number;
  player_current_count: number;

  createdAt: string;
  updatedAt: string;
};

function SearchMyTeamPost() {
  const [groupList, setGroupList] = useState<GroupPost[]>([]);
  const properties = [
    '작성자',
    '제목',
    '지역',
    '모집 상태',
    'GK',
    'Player',
    '작성일자',
  ];
  const user = useSelector(userSelector);
  const filteredItems = groupList.filter(
    (item: GroupPost) => item.status === '모집중'
  );
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/group`, {
        withCredentials: true,
      })
      .then((res) => res.data.data)
      .then((result) => {
        setGroupList(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MyPostTable
      title="내 팀 모집 글"
      properties={properties}
      groupData={filteredItems}
    />
  );
}

export default SearchMyTeamPost;
