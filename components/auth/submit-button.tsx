type Props = {
  text: string;
};

const SubmitButton: React.FC<Props> = ({ text }) => (
  <input className="cta cursor-pointer" type="submit" value={text} />
);

export default SubmitButton;
