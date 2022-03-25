import Button from '@components/elements/button/Button';
import React from 'react';
import { BsBookmark, BsHeart } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { VscComment } from 'react-icons/vsc';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';

const DisplayActions = () => {
  return (
    <div className="flex items-center justify-between max-w-[80%]">
      <Button
        icon={<VscComment />}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        rounded
      />
      <Button
        icon={<AiOutlineRetweet />}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        rounded
      />
      <Button
        icon={<BsHeart />}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        rounded
      />
      <Button
        icon={<BsBookmark />}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        rounded
      />
    </div>
  );
};

export default DisplayActions;
