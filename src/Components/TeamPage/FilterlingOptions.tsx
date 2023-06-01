import React from 'react';

const FilterlingOptions = {
  findingTeam: {
    status: [
      { value: 'option0', label: '모집상태' },
      { value: 'option1', label: '미완료' },
      { value: 'option2', label: '완료' },
    ],
    area: [
      { value: 'option0', label: '활동지역' },
      { value: 'option1', label: '서울' },
      { value: 'option2', label: '부산' },
      { value: 'option3', label: '경기' },
      { value: 'option4', label: '영국' },
      { value: 'option5', label: '독일' },
      { value: 'option6', label: '인천' },
    ],
    skill: [
      { value: 'option0', label: '실력수준' },
      { value: 'option1', label: '프로' },
      { value: 'option2', label: '세미프로' },
      { value: 'option3', label: '고급자' },
      { value: 'option4', label: '중급자' },
      { value: 'option5', label: '초급자' },
      { value: 'option6', label: '입문자' },
    ],
    position: [
      { value: 'option0', label: '포지션' },
      { value: 'option1', label: '상관없음' },
      { value: 'option2', label: '골키퍼' },
      { value: 'option3', label: '필드플레이어' },
    ],
    gender: [
      { value: 'option0', label: '성별' },
      { value: 'option1', label: '남' },
      { value: 'option2', label: '여' },
    ],
  },
  findingMember: {
    status: [
      { value: 'option0', label: '모집상태' },
      { value: 'option1', label: '모집중' },
      { value: 'option2', label: '모집완료' },
    ],
    area: [
      { value: 'option0', label: '활동지역' },
      { value: 'option1', label: '서울' },
      { value: 'option2', label: '부산' },
      { value: 'option3', label: '수원' },
    ],
    allowRandom: [
      { value: 'option0', label: '랜덤매칭여부' },
      { value: 'option1', label: '가능' },
      { value: 'option2', label: '불가능' },
    ],
    members: [
      { value: 'option0', label: '현재인원' },
      { value: 'option1', label: '1' },
      { value: 'option2', label: '2' },
      { value: 'option3', label: '3' },
      { value: 'option4', label: '4' },
      { value: 'option5', label: '5' },
      { value: 'option6', label: '6' },
    ],
    gender: [
      { value: 'option0', label: '성별' },
      { value: 'option1', label: '남자' },
      { value: 'option2', label: '여자' },
      { value: 'option3', label: '상관없음' },
    ],
  },
};

export default FilterlingOptions;
