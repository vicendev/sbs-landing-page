import { Icon } from "@iconify/react"

type Props = {
  height?: number,
  width?: number,
} & Record<string, any>;

export const LoadingSpinner = ({height = 30, width = 30, ...rest }: Props) => {
  return (
    <Icon {...rest} width={height} height={width} icon="svg-spinners:12-dots-scale-rotate" /> 
  )
}