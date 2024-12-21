import useSWR from 'swr';
import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';

interface Grade {
  id: number; // Ensure you fetch the correct ID
  grade: string;
}
interface SectionSelectProps {
  selectedGradeId: string;
  onSelectSection: (value: string) => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SectionSelect: React.FC<SectionSelectProps> = ({
  selectedGradeId,
  onSelectSection,
}) => {
  const { data: sections, error } = useSWR<Grade[]>(
    `/api/section/${selectedGradeId}`, // Ensure selectedGradeId is numeric
    fetcher
  );

  if (error) {
    console.error('Error fetching sections:', error);
    return <div>Error loading sections.</div>;
  }

  return (
    <Select onValueChange={onSelectSection}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Section" />
      </SelectTrigger>
      <SelectContent>
        {sections && sections.length > 0 ? (
          sections.map((section: any) => (
            <SelectItem key={section.id} value={section.id}>
              {section.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="not-found">No Sections Found</SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default SectionSelect;
