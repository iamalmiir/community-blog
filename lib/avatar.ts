import * as gravatar from 'gravatar';

export const assignAvatar = (email) => {
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'retro',
  });
  return avatar;
};
