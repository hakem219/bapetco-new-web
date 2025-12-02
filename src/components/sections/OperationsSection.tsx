import React from 'react';
import drillingImg from '../../assets/images/Onshore_Drilling_Rig_-_Mid-Day_Activity.png';
import processingImg from '../../assets/images/Gas_Processing_Plant.png';
import storageImg from '../../assets/images/Crude_Oil_Storage_Tanks.png';

interface OperationsProps {
  language: string;
}

const OperationsSection: React.FC<OperationsProps> = ({ language }) => {
  const content = {
    en: {
      title: "Our Operations",
      subtitle: "Excellence in Energy Production",
      operations: [
        {
          title: "Exploration & Drilling",
          description: "Advanced exploration techniques and state-of-the-art drilling operations across Egypt's Western Desert.",
          image: drillingImg
        },
        {
          title: "Processing & Refining",
          description: "Modern processing facilities ensuring optimal production and highest quality standards.",
          image: processingImg
        },
        {
          title: "Storage & Distribution",
          description: "Strategic storage facilities and efficient distribution networks serving Egypt's energy needs.",
          image: storageImg
        }
      ]
    },
    ar: {
      title: "عملياتنا",
      subtitle: "التميز في إنتاج الطاقة",
      operations: [
        {
          title: "الاستكشاف والحفر",
          description: "تقنيات استكشاف متقدمة وعمليات حفر حديثة عبر الصحراء الغربية لمصر.",
          image: drillingImg
        },
        {
          title: "المعالجة والتكرير",
          description: "مرافق معالجة حديثة تضمن الإنتاج الأمثل وأعلى معايير الجودة.",
          image: processingImg
        },
        {
          title: "التخزين والتوزيع",
          description: "مرافق تخزين استراتيجية وشبكات توزيع فعالة تخدم احتياجات مصر من الطاقة.",
          image: storageImg
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <section className="section-padding bg-white">
      <div className="container-fluid">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 text-petroleum-900 mb-4">{currentContent.title}</h2>
          <p className="text-xl text-gray-600">{currentContent.subtitle}</p>
        </div>

        {/* Operations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {currentContent.operations.map((operation, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img 
                  src={operation.image} 
                  alt={operation.title}
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-petroleum-950 via-petroleum-950/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {operation.title}
                </h3>
                <p className="text-gray-200 text-sm">
                  {operation.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationsSection;