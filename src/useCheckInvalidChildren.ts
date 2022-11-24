import { useEffect, Children } from 'react';

export default function useCheckInvalidChildren(
  children: React.ReactNode,
  ...components: (React.ComponentClass<any> | React.FunctionComponent<any>)[]
) {
  useEffect(() => {
    try {
      const hasInvalidChild = Children.toArray(children).find((child: any) => {
        return !components.includes(child.type);
      });

      if (hasInvalidChild) {
        throw new TypeError(`\`children\` do not match the given type.`);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(error as TypeError);
      }
    }
  }, [children, components]);
}
