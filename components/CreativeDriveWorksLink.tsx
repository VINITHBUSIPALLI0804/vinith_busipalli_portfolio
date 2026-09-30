const creativeWorksFolder =
  "https://drive.google.com/drive/folders/15bPk8fl68oiffWUkdeOzWw1YpV0X3-d4?usp=sharing";

export default function CreativeDriveWorksLink() {
  return (
    <a
      className="creative-drive-works"
      href={creativeWorksFolder}
      target="_blank"
      rel="noreferrer"
    >
      WORKS
    </a>
  );
}
