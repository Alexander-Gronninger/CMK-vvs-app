import { useContext } from "react";
import GF2QVKVRelationInput from "../components/GF2QVKVRelationInput";
import GF2Context from "../context/GF2Context";

const GF2TeacherQVKVRelation = () => {
  const { GF2Data } = useContext(GF2Context);

  return (
    <div className="grid gap-2 w-full">
      <p className="col-start-1 col-end-6">
        2. Indstil forholdet mellem lufthastigheden Qv [m/s] og
        kontrolventilåbningen [mm] for de enkelte KV’er. Jo højere tal, jo
        hurtigere lufthastighed (1-5).
      </p>
      {[...Array(GF2Data.length - 1)].map((_, index) => {
        return (
          <GF2QVKVRelationInput
            index={index}
            key={"QVKVRelation" + index}
            id={"QVKVRelation" + index}
          />
        );
      })}
    </div>
  );
};

export default GF2TeacherQVKVRelation;
