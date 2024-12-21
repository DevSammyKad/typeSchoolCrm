import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import useSWR from 'swr';

interface GradeSelectProps {
  selectedGrade: (value: string) => void;
  defaultGrade: string;
}

interface Grade {
  grade: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GradeSelect: React.FC<GradeSelectProps> = ({
  selectedGrade,
  defaultGrade,
}) => {
  const { data: grades, error } = useSWR<Grade[]>('/api/grade', fetcher);

  console.log('Grades:', grades);

  if (error) {
    console.error('Failed to fetch grades:', error);
    return <div>Error loading grades.</div>;
  }

  return (
    <Select onValueChange={selectedGrade} defaultValue={defaultGrade}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Grade" />
      </SelectTrigger>
      <SelectContent>
        {grades && grades.length > 0 ? (
          grades.map((item) => (
            <SelectItem key={item.grade} value={item.grade}>
              {item.grade}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="not-found">Grade Not Found</SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default GradeSelect;
