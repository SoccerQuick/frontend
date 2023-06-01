const playGroundDetailDummy = {
  title: '고양 싸커스토리 축구클럽 운정점',
  image: [
    'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
    'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
    'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
  ],
  address: {
    shortAddress: '경기 / 고양시',
    fullAddress: '경기도 고양시 일산서구 덕이로 310-2',
  },
  provided: ['풋살화 대여', '남녀 구분 화장실', '공 대여', '조끼 대여'],
  nonProvided: ['무료 주차', '샤워실'],
  reservation: {
    일반: [
      '7일 전 취소 시 100% 환불',
      '5일 전 취소 시 80% 환불',
      '3일 전 취소 시 50% 환불',
      '2일 전 ~ 예약 당일 환불 불가',
      '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
    ],
    천재지변: [
      '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
      '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
    ],
    '우천시 변경 기준': [
      '시간 당 5mm 이상 시 날짜 변경 가능',
      '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
      '단순 변심에 의한 날짜 변경은 불가',
    ],
  },
  url: 'https://www.plabfootball.com/stadium/3415/info/',
  source: '(주)플랩',
};

export default playGroundDetailDummy;
