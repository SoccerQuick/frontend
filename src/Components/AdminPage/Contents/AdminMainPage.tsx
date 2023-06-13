import React from 'react';
import axios from 'axios';

interface UserData {
  admin_id?: string;
  user_id: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
  role: string;
  gender: string;
  createdAt: string;
  login_banned: boolean;
  login_banEndDate: string | null;
  community_banned: boolean;
  community_banEndDate: string | null;
}

function AdminMain() {
  return (
    <div
      style={{
        display: 'flex',
        height: '50vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      관리자 메인페이지
    </div>
  );
}

export default AdminMain;
