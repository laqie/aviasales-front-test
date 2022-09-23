import { styled } from '../stitches.config';
import { skeleton } from '../styles';
import Filter from './Filter';
import Checkbox from './Checkbox';


function FilterSkeleton() {
  return (
    <Filter.Label>
      <Filter.Input
        type="checkbox"
        disabled={true}
        defaultChecked={false} />
      <Checkbox isActive={true} />
      <TextSkeleton />
    </Filter.Label>
  );
}


const TextSkeleton = styled('span', {
  ...skeleton('70%', '13px'),
});


FilterSkeleton.Skeleton = TextSkeleton;

export default FilterSkeleton;
