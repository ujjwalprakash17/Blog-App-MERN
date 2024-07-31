import { useSelector } from "react-redux";

const UserCard = ({time}) => {

  const userDetail = useSelector((state) => state.userDetail);

  return (
    <address className="flex itemsCenter mb-6 not-italic">
      <div className="inline-flex itemsCenter mr-3 text-sm text-gray-900 dark:text-white">
        <img
          className="mr-4 w-16 h-16 rounded-full"
          src={userDetail.profileImg}
          alt="Jese Leos"
        />
        <div>
          <a
            href="#"
            rel="author"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            {userDetail.username}
          </a>
          {/* <p className="text-base text-gray-500 dark:text-gray-400">
          </p> */}
          <p className="text-base text-gray-500 dark:text-gray-400">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              {userDetail.email}
            </time>
          </p>
        </div>
      </div>
    </address>
  );
};

export default UserCard;
