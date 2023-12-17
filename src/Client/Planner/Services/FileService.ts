import { toRefs } from 'vue';
import { ProductionList } from '../Models/ProductionList';
import { useProductionListStore } from '../Stores/productionList';

export function importProductionData(file: File) {
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      try {
        const data = reader.result as string;
        const parsedData = JSON.parse(data) as ProductionListData;
        if (parsedData.version && parsedData.name == 'Production List') {
          if (parsedData.data.length <= 0) {
            throw new Error('No data found');
          }
          const store = useProductionListStore();
          store.selectedListId = parsedData.data[0].Id;
          store.productionLists = parsedData.data;
        }
      } catch (e) {
        console.error(e);
      }
    };
  }
}
export function exportProductionData() {
  const { productionLists } = useProductionListStore();

  const jsonData: ProductionListData = {
    version: '0.1',
    name: 'Production List',
    data: productionLists,
  };

  const jsonString = JSON.stringify(jsonData);

  const fileToDownload = new Blob([jsonString], {
    type: 'application/json',
  });

  const downloadLink = document.createElement('a');
  downloadLink.download = 'production-data.json';
  downloadLink.href = window.URL.createObjectURL(fileToDownload);
  downloadLink.style.display = 'none';

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

type ProductionListData = {
  version: string;
  name: 'Production List';
  data: ProductionList[];
};
