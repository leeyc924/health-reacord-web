import React, { useCallback, useMemo, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { v4 } from 'uuid';

import { initialForm } from '../../libs/constants/fake';
import { IForm } from '../../libs/type/form';
import Card from '../../libs/component/Card';
import AddBox from '../../libs/component/AddBox';

const RecordPage = () => {
  const [day, setDay] = useState('09');
  const [formData, setFormData] = useState(initialForm);

  const handleAdd = useCallback(({ day, title, allCnt, setList }: Omit<IForm, 'id'>) => {
    setFormData(formData => formData.concat({ id: v4(), day, title, allCnt, setList }));
    alert('추가되었습니다');
  }, []);

  const handleEdit = useCallback(({ id, day, title, allCnt, setList }: IForm) => {
    setFormData(formData => formData.map(form => (form.id === id ? { ...form, day, title, allCnt, setList } : form)));
    alert('수정되었습니다');
  }, []);

  const handleRemove = useCallback((id: string) => {
    if (confirm('삭제하시겠습니까?')) {
      setFormData(formData => formData.filter(data => data.id !== id));
      alert('삭제되었습니다');
    }
  }, []);

  const FilterList = useMemo(() => {
    return formData.filter(form => form.day.split('.')[0] === day);
  }, [day, formData]);

  return (
    <section className="flex flex-col h-full gap-2 p-2 overflow-y-auto">
      <div className="flex mb-4 items-center">
        <select className="w-36 h-10 p-2 bg-lime-100" value={day} onChange={e => setDay(e.target.value)}>
          <option value="09">9월</option>
          <option value="08">8월</option>
        </select>
        <AddBox onAdd={handleAdd} />
      </div>
      {FilterList.map((data, index) => (
        <Card
          key={index}
          id={data.id}
          day={data.day}
          title={data.title}
          allCnt={data.allCnt}
          setList={data.setList}
          onRemove={handleRemove}
          onEdit={handleEdit}
        />
      ))}
    </section>
  );
};

export async function getServersideProp({ query }: GetServerSidePropsContext) {
  const props = { ...query };
  return {
    props,
  };
}

export default RecordPage;
