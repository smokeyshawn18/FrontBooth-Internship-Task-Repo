import { Empty } from "antd";
import Text from "antd/es/typography/Text";

export const ErrorPage = () => {
  return (
    <main className="flex min-h-100 items-center justify-center px-4">
      <Empty
        description={
          <div>
            <Text type="danger">Unable to load posts</Text>
            <p className="mt-1 text-sm text-gray-500">
              Please try again later.
            </p>
          </div>
        }
      />
    </main>
  );
};
