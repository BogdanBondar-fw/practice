import classNames from 'classnames';
import usersFromServer from '../../api/users';

export const UserFilter = ({ selectedUserId, onSelect }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      className={classNames({ 'is-active': selectedUserId === null })}
      onClick={() => onSelect(null)}
    >
      All
    </a>
    {usersFromServer.map(user => (
      <a
        key={user.id}
        data-cy="FilterUser"
        href="#/"
        className={classNames({ 'is-active': selectedUserId === user.id })}
        onClick={() => onSelect(user.id)}
      >
        {user.name}
      </a>
    ))}
  </p>
);
