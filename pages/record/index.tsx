import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';

const RecordPage = () => {
  return (
    <>
      <div className="">
        <div>날짜</div>
        <div>운동명</div>
        <div>횟수</div>
        <div>총량</div>
      </div>
    </>
  );
};

export async function getServersideProp({ query }: GetServerSidePropsContext) {
  const props = { ...query };
  return {
    props,
  };
}

export default RecordPage;
