import { GroupPost } from './SearchMyPost/SearchMyTeamPost';
import { ReviewPost } from './SearchMyPost/SearchMyReviewPost';
import axios from 'axios';

export const changeGroupObjectToArray = (item: GroupPost): Array<string> => {
  return [
    'teamPage',
    item.leader_name,
    `${item.title}${item.applicant.length}`,
    `[${item.applicant.length}]`,
    item.location,
    item.status,
    `${item.player_current_count}/${item.player_count}`,
    `${item.gk_current_count}/${item.gk_count}`,
    item.group_id,
  ];
};

export const changeReviewObjectToArray = (item: ReviewPost): Array<string> => {
  return [
    'ground',
    item.name,
    item.contents,
    '',
    `${item.ground_id}`,
    `${item.userslikes.length}`,
    `${item.review_id}`,
  ];
};
