type CommonInfoProps = {
  label: string,
  value: string
}

export const CommonInfo = ({ label, value }: CommonInfoProps) => {
  const classNameLabel = "font-bold justify-self-end";
  return (
    <>
      <span className={classNameLabel}>{label}</span>
      <span>{value}</span>
    </>
  )
}
